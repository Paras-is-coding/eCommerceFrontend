import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { MultipleImageUploader } from "../../../component/common/form/input.component";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../component/common/button/button.component";
import placeholder from "../../../assets/images/imageplaceholder.svg";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import categorySvc from "../category/category.service";
import brandSvc from "../brand/brand.service";
import userSvc from "../user/user.service";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductForm = ({ submitEvent, loading = false, detail = null }) => {
  const [thumb, setThumb] = useState();
  const [categs, setCategs] = useState();
  const [brands, setBrands] = useState();
  const [sellers, setSellers] = useState();
  const [attributes, setAttributes] = useState([
    {
      key: null,
      value: [],
    },
  ]);

  const loadCategs = async () => {
    try {
      let res = await categorySvc.categoryLists({ page: 1, limit: 100 });

      if (res.data.result.length) {
        let data = [];
        res.data.result.map((item) => {
          data.push({
            value: item._id,
            label: item.title,
          });
        });
        setCategs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadBrands = async () => {
    try {
      let res = await brandSvc.brandLists({ page: 1, limit: 300 });

      if (res.data.result.length) {
        let data = [];
        res.data.result.map((item) => {
          data.push({
            value: item._id,
            label: item.title,
          });
        });
        setBrands(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadSellers = async () => {
    try {
      const res = await userSvc.listOfUsers({ role: "seller" });
      setSellers(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSellers();
    loadCategs();
    loadBrands();
  }, []);

  const addAttributes = (e) => {
    attributes.push({
      key: null,
      value: [],
    });
    setAttributes([...attributes]);
  };
  const deleteAttribute = (index) => {
    attributes.splice(index, 1);
    setAttributes([...attributes]);
  };
  const productSchema = Yup.object({
    title: Yup.string().min(3).required(),
    summary: Yup.string().required(),
    description: Yup.string().optional(),
    category: Yup.array(
      Yup.object({
        label: Yup.string(),
        value: Yup.string(),
      })
    ),
    brand: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    }).optional(),
    price: Yup.number().min(1).required(),
    discount: Yup.number().min(0).default(0).max(100).optional(),
    tags: Yup.array(
      Yup.object({
        label: Yup.string(),
        value: Yup.string(),
        __isNew__: Yup.boolean(),
      })
    ),
    sellerId: Yup.string(),
    attributes: Yup.array(
      Yup.object({
        key: Yup.string(),
        value: Yup.array(
          Yup.object({
            label: Yup.string(),
            value: Yup.string(),
            __isNew__: Yup.boolean(),
          })
        ),
      })
    )
      .nullable()
      .optional(),
    status: Yup.string().matches(/^(active|inactive)$/, {
      message: "Status can only be active or inactive",
    }),
  });
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: detail?.title || "",
      summary: detail?.summary || "",
      description: detail?.description || "",
      category: detail?.category || [],
      brand: detail?.brand || null,
      price: detail?.price || "",
      discount: detail?.discount || "",
      tags: detail?.tags || [],
      sellerId: detail?.sellerId || "",
      status: detail?.status || "",
    },
  });

  const submitForm = (data) => {
    // data.attributes = attributes;
    const sendAttributes = [];
    attributes.map((att) => {
      sendAttributes.push({
        key: att.key,
        value: att.value.map((val) => val.value),
      });
    });
    // mapping raw form data to API expected data type
    // const mappedData = {
    //   title: data.title,
    //   summary: data.summary,
    //   description: data.description,
    //   category: data.category.map((cat) => cat.value).join(","),
    //   brand: data.brand.value,
    //   price: data.price,
    //   discount: data.discount,
    //   tag: data.tag.map((t) => t.value).join(","),
    //   sellerId: data.sellerId,
    //   status: data.status,
    //   attributes: sendAttributes,
    //   images:data.images
    // };

    // formData
    // multipart/form-data  => multiple files
    // custom bind for arranging attributes and images field
    console.log(data)
    const categStr = data.category.map((cat) => cat.value).join(",");
    const tagStr = data.tags.map((t) => t.value).join(",");
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("summary", data.summary)
    formData.append("description", data.description)
    formData.append("category", categStr)
    formData.append("brand", data.brand.value)
    formData.append("price", data.price)
    formData.append("discount", data.discount|| 0  )
    formData.append("tags", tagStr)
    formData.append("sellerId", data.sellerId)
    formData.append("status", data.status)

    sendAttributes.map((att,ind)=>{
        formData.append(`attributes[${ind}][key]`,att['key'])
        att.value.map((val,index)=>{
            formData.append(`attributes[${ind}][value][${index}]`,val)
        })
    })
    data.images.map((img)=>{
        formData.append("images",img,img.filename)
    })





    // console.log(mappedData)
    submitEvent(formData);
  };

  useEffect(() => {
    if (detail) {
      Object.keys(detail).map((field, ind) => {
        if (field !== "images") {
          setValue(field, detail[field]);
        }
      });
      setThumb(detail.images);
    }
  }, [detail]);

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Title: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Enter Product Title..."
              size="sm"
              {...register("title", { required: true })}
            />
            <ErrorMessage message={errors?.title?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Summary: </Form.Label>
          <Col sm={9}>
            <Form.Control
              as={"textarea"}
              placeholder="Enter summary of product..."
              size="sm"
              rows={5}
              style={{ resize: "none" }}
              {...register("summary", { required: true })}
            />
            <ErrorMessage message={errors?.summary?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Description: </Form.Label>
          <Col sm={9}>
            {/* editor   */}
            <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue("description", data);
              }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot()
                );
                });
            }}
            />
            {/* <Form.Control
              as={"textarea"}
              placeholder="Enter Description of product..."
              size="sm"
              rows={5}
              style={{ resize: "none" }}
              {...register("description", { required: false })}
            /> */}
            <ErrorMessage message={errors?.description?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Attributes: </Form.Label>
          <Col sm={9}>
            {attributes &&
              attributes.length &&
              attributes.map((row, index) => {
                return (
                  <Row className="mb-2" key={index}>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          const value = e.target.value;
                          attributes[index]["key"] = value;
                          setAttributes([...attributes]);
                        }}
                      />
                    </Col>
                    <Col sm={6}>
                      <CreatableSelect
                        isClearable
                        placeholder={"Enter tags for product"}
                        isMulti
                        onChange={(newValue) => {
                          attributes[index]["value"] = newValue;
                          setAttributes([...attributes]);
                        }}
                      />
                    </Col>
                    <Col sm={1}>
                      {index !== 0 && (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteAttribute(index);
                          }}
                          className="ms-2"
                          type="button"
                          variant="danger"
                        >
                          <i className="fa fa-trash "></i>
                        </Button>
                      )}
                    </Col>
                  </Row>
                );
              })}
            <Row>
              <Col sm={{ offset: 9, span: 3 }}>
                <Button
                  type="button"
                  onClick={addAttributes}
                  variant="success"
                  className="float-end"
                  size="sm"
                >
                  <i className="fa fa-plus"></i>
                  &nbsp;Add More
                </Button>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Status: </Form.Label>
          <Col sm={9}>
            <Form.Select size="sm" {...register("status")}>
              <option value="">--Select Any one--</option>
              <option value="active">Publish</option>
              <option value="inactive">Un-Publish</option>
            </Form.Select>
            <ErrorMessage message={errors?.status?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Category: </Form.Label>
          <Col sm={9}>
            <Select
              options={categs}
              isMulti
              onChange={(selectedCategories) => {
                setValue("category", selectedCategories);
              }}
            />
            <ErrorMessage message={errors?.category?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Brand: </Form.Label>
          <Col sm={9}>
            <Select
              options={brands}
              placeholder={"--Select Any One--"}
              onChange={(selectedBrand) => {
                setValue("brand", selectedBrand);
              }}
            />
            <ErrorMessage message={errors?.brand?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Price: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              placeholder="Enter the price..."
              size="sm"
              {...register("price", { required: true, min: 1 })}
            />
            <ErrorMessage message={errors?.price?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Discount: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              placeholder="Enter discount percent"
              size="sm"
              {...register("discount", { required: false, min: 0, max: 100 })}
            />
            <ErrorMessage message={errors?.discount?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Tags: </Form.Label>
          <Col sm={9}>
            <CreatableSelect
              isClearable
              placeholder={"Enter tags for product"}
              isMulti
              onChange={(tags) => {
                setValue("tags", tags);
              }}
            />
            <ErrorMessage message={errors?.tags?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Seller: </Form.Label>
          <Col sm={9}>
            <Form.Select size="sm" {...register("sellerId")}>
              <option value="">--Select Any one--</option>
              {sellers && sellers.length > 0
                ? sellers.map((row, ind) => (
                    <option value={row._id} key={ind}>
                      {row.name}
                    </option>
                  ))
                : ""}
            </Form.Select>

            <ErrorMessage message={errors?.sellerId?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Image: </Form.Label>
          <Col sm={3}>
            <MultipleImageUploader
              setThumb={setThumb}
              setValue={setValue}
              setError={setError}
            />
            <ErrorMessage message={errors?.image?.message} />
          </Col>
          <Col sm={6}>
            <Row>
              {thumb &&
                thumb.length &&
                thumb.map((image, ind) => (
                  <Col key={ind} sm={2}>
                    <Image
                      src={
                        image
                          ? typeof image === "string"
                            ? import.meta.env.VITE_IMAGE_URL +
                              "product/" +
                              image
                            : URL.createObjectURL(image)
                          : placeholder
                      }
                      fluid
                      alt=""
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <ButtonComponent
              label="Cancel"
              type="reset"
              className="btn-danger me-3"
              loading={loading}
            />
            <ButtonComponent
              label="Submit"
              type="submit"
              className="btn-success"
              loading={loading}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProductForm;

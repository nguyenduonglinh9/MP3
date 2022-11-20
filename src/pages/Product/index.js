import styles from "./Product.module.scss";
import { useEffect, useState, useRef, useContext } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowDown } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcSupport } from "react-icons/fc";
import { BsPlusLg } from "react-icons/bs";
import { DataSearchContext } from "../../components/Layout/LayoutMain";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";

function Product() {
  AOS.init();
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const DataSearch = useContext(DataSearchContext);
  let dollarUSLocale = Intl.NumberFormat("en-US");


  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleBrand, setToggleBrand] = useState(false);
  const [curentItemName, setCurrentItemName] = useState("Màn hình");
  const [idCate, setIdCate] = useState("634f9eea3f879eb6fc81bf01");
  const [loading, setLoading] = useState(false);
  const softSearch = useRef();

  

  if (DataSearch != "") {
    if (typeof DataSearch == "string") {
      softSearch.current = products.filter((item, index) => {
        return (
          item.name.includes(DataSearch) ||
          String(item.price).includes(DataSearch) ||
          item.description.includes(DataSearch)
        );
      });
    }
  } else {
    softSearch.current = undefined;
  }

  console.log(softSearch.current);

  const refItem = useRef();

  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategory((prev) => [...prev, ...data.data]);
      });
  }, []);

  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/brand/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBrands((prev) => [...prev, ...data.data]);
      });
  }, []);

  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/product/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts((prev) => [...prev, ...data.data]);
        setLoading(true);
      });
  }, []);

  // console.log(list)
  const handleOpenCategory = () => {
    setToggleCategory(true);
  };
  const handleOpenBrand = () => {
    setToggleBrand(true);
  };
  function handleCloseItem() {
    setToggleCategory(false);
    setLoading(false);
  }
  const HandleDetail = (id) => {
    navigate("/detail-product",{state:{id:id}});
  }

  const handleNavigateAddProduct = () => {
    navigate("/add-product")
  }

  return (
    <div className={clsx(cx("container"))}>
      {softSearch.current == undefined ? undefined : (
        <div className={clsx(cx("list-search"))}>
          {softSearch.current.map((item, index) => {
            return (
              <div className={clsx(cx("item-search"))}>
                <img style={{ width: "70px" }} src={item.image}></img>
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
                <div className={clsx(cx("item-search-option"))}>
                  <div>
                    <FcFullTrash />
                  </div>
                  <div>
                    <FcRules />
                  </div>
                  <div>
                    <FcSupport />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div
            onClick={handleOpenCategory}
            className={clsx(cx("drop-down-menu"))}
          >
            <span ref={refItem}>{curentItemName}</span>
            <FaArrowDown />
          </div>
          <div
            className={clsx(cx("drop-down-menu2"), {
              [styles.open_drop_item]: toggleCategory,
            })}
          >
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setIdCate(item._id);
                    setCurrentItemName(item.title);
                    setToggleCategory(false);
                  }}
                  className={clsx(cx("drop-down-menu-item"))}
                >
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div onClick={handleOpenBrand} className={clsx(cx("drop-down-menu"))}>
            <span ref={refItem}>
              {brands
                .filter((item, index) => item.category == idCate)
                .map((item2, index) => {
                  return item2.title;
                })}
            </span>
            <FaArrowDown />
          </div>
          <div
            className={clsx(cx("drop-down-menu2"), {
              [styles.open_drop_item]: toggleBrand,
            })}
          >
            {brands
              .filter((brand, index) => {
                return brand.category == idCate;
              })
              .map((brand2, index2) => {
                return (
                  <div
                    key={index2}
                    onClick={() => {
                      // setCurrentItemName(item.title);
                      setToggleBrand(false);
                    }}
                    className={clsx(cx("drop-down-menu-item"))}
                  >
                    <span>{brand2.title}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={clsx(cx("listproduct"))}>
        <div style={{ display: "flex",justifyContent:"space-between",margin:'20px'}}>
          <div>
            <h3 style={{margin:"0px"}}>PRODUCTS</h3>
            <p style={{opacity:'0.7'}}>products/ {curentItemName}</p>
          </div>
          <div onClick={handleNavigateAddProduct} className={clsx(cx("button-add-new"))}>
            <p>Add</p>
          </div>
        </div>
        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Price</p>
              </th>
              <th>
                <p>Category</p>
              </th>
              <th>
                <p>Brand</p>
              </th>
              <th>
                <p>Quantity</p>
              </th>
              <th>
                <p>Status</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product, index) => {
                return product.category == idCate;
              })
              .map((item, index) => {
                return (
                  <tr onClick={() => HandleDetail(item._id)} key={index}>
                    <td>
                      <img src={item.images[0]}></img>
                    </td>
                    <td className={clsx(cx("title_td"))}>{item.title}</td>
                    <td>{dollarUSLocale.format(item.costPrice)}</td>
                    <td>
                      {category
                        .filter((cate) => cate._id == item.category)
                        .map((item3) => item3.title)}
                    </td>
                    <td>
                      {brands
                        .filter((brand) => brand._id == item.brand)
                        .map((item2) => item2.title)}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.quantity > 0 ? (
                        <div className={clsx(cx("status_conhang"))}>
                          <p>On-Sale</p>
                        </div>
                      ) : (
                        <div className={clsx(cx("status_hethang"))}>
                          <p>Out Of Stock</p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      {loading == false ? (
        <div className={clsx(cx("container-loading"))}>
          <div className={clsx(cx("box"))}></div>
          <div className={clsx(cx("box2"))}></div>
          <div className={clsx(cx("box3"))}></div>
        </div>
      ) : undefined}
    </div>
  );
}

export default Product;

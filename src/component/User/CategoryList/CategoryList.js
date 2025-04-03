import style from './CategoryList.module.css'
import { GetCategories } from '../../../apiServices/ProductService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes';
function CategoryList() {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetCategories()
                setCategories(res)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchApi();
    }, []);
    function scrollR() {
        document.getElementById('categoryContainer').scrollBy({
            left: 1000,
            behavior: 'smooth'
        });
    }
    function scrollL() {
        document.getElementById('categoryContainer').scrollBy({
            left: -1000,
            behavior: 'smooth'
        });
    }
    if (loading) {
        return <>none</>
    }
    return (
        <section>
            <center>
                <div className="container justify-content-center align-content-center">
                    <div className={style.wrapper}>
                        <h2 style={{ textTransform: "capitalize" }} className="title text-center">Danh Mục Sản Phẩm</h2>

                        <button className={`${style.thisButton} ${style.buttonLeft}`} onClick={scrollL}
                            onMouseOver={(e) => (e.target.style.color = 'blue')}
                            onMouseOut={(e) => (e.target.style.color = 'white')}>&#9664;
                        </button>
                        <div className={style.categoryContainer} id="categoryContainer">

                            {categories.map((category, index) => {
                                return (index % 2 === 0 && <div key={index} className={style.column}>
                                    <div className={style.category}>
                                        <Link to={`${routePaths.category}?id=${category.productCategoryId}`}>
                                            <img src={`${process.env.REACT_APP_API_URL}${category.anhDaiDien}`} alt="category"></img>
                                            <div className="category-name">{category.tenLoai}</div>
                                        </Link>
                                    </div>
                                    {index + 1 < categories.length && <div className={style.category}>

                                        <Link to={`${routePaths.category}?id=${categories[index + 1]?.productCategoryId}`}>
                                            <img src={`${process.env.REACT_APP_API_URL}${categories[index + 1]?.anhDaiDien}`} alt="category"></img>
                                            <div className="category-name">{categories[index + 1]?.tenLoai}</div>
                                        </Link>

                                    </div>}
                                </div>)
                            })}


                            <button className={`${style.thisButton} ${style.buttonRight}`} onClick={scrollR}
                                onMouseOver={(e) => (e.target.style.color = 'blue')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}>
                                &#9654;
                            </button>
                        </div>
                    </div>
                </div>
            </center>
        </section>
    );
}

export default CategoryList;
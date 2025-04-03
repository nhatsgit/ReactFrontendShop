import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { routePaths } from '../../../routes';
import { Link } from 'react-router-dom';
import * as SearchService from '../../../apiServices/SearchService';
import ImageModal from './ImageModal';

function SearchForm() {

    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 350);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        if (debouncedKeyword.trim() === '') {
            setSuggestions([]);
            setKeyword('');
            return;
        }
        const fetchApi = async () => {
            const result = await SearchService.SearchSuggestion(debouncedKeyword);

            setSuggestions(result);
        }
        fetchApi();
        setShowSuggestions(true);
    }, [debouncedKeyword]);

    function handleClearInput() {
        setShowSuggestions(false)
        setKeyword('');
        inputRef.current.focus();
    };
    function handleSearchSubmit() {
        setShowSuggestions(false);
        setKeyword('');
    }
    function handleSearchImageClick() {

    }
    function handleCompleteSuggestion(suggestion) {
        setKeyword(suggestion);
        setShowSuggestions(false);
    }


    return (
        <form id="search-form" className="dropdown">
            <div className="search-container">

                <input className="inputSearch" value={keyword} type="text" name="query" onChange={(event) => handleCompleteSuggestion(event.target.value)} ref={inputRef} id="searchInput" placeholder="Tìm kiếm sản phẩm trong hệ thống..." />
                {keyword && (
                    <button

                        type="button"
                        onClick={handleClearInput}
                        style={{
                            position: 'absolute',
                            right: '160px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: '#888'
                        }}
                    >
                        &times;
                    </button>
                )}
                <Link to={`${routePaths.searchByImage}`}>
                    <button
                        className="searchButtonCamera"
                        type="button"
                        onMouseOver={(e) => e.target.style.color = 'blue'}
                        onMouseOut={(e) => e.target.style.color = 'rgb(15, 162, 254)'}
                    >
                        <i className="fa fa-camera"></i>
                    </button>
                </Link>


                <Link onClick={handleSearchSubmit} to={`${routePaths.search}?keyword=${keyword}`}>
                    <button

                        className="searchButton"
                        type="submit"
                        onMouseOver={(e) => e.target.style.color = 'black'}
                        onMouseOut={(e) => e.target.style.color = 'white'}
                    >
                        Tìm Kiếm
                    </button>
                </Link>
            </div>
            {showSuggestions &&
                (
                    <div id="suggestions" style={{ display: 'block' }}>
                        {
                            suggestions.map((result, index) => (
                                <li key={index} onClick={() => setKeyword(result)}>{result}</li>
                            ))
                        }
                    </div>
                )
            }
        </form>
    );
}

export default SearchForm;
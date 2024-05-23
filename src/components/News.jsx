import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = () => {
    const [newsData, setNewsData] = useState([]);
    const [country, setCountry] = useState('fr');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 2; 

    const [category, setCategory] = useState(""); 

    useEffect(() => {
        fetchNews(); // Appeler fetchNews au chargement initial du composant
    }, [country, category]); // Ajouter country et category aux dépendances de useEffect pour déclencher la recherche lorsque ces valeurs changent

    const fetchNews = async () => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
            );
            setNewsData(response.data.articles);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching the news data', error);
        }
    };

    // Calculer les articles pour la page actuelle
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = newsData.slice(indexOfFirstArticle, indexOfLastArticle);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChange = (event) => {
        setCategory(event.target.value)
        fetchNews()
    }

    return (
        <div className="border border-gray-300 p-4 w-full sm:w-1/2 lg:w-1/3 h-97 overflow-y-scroll">
            <div className="mb-4">  
                <div className="font-bold mb-2 text-xl">News</div>
                <form>
                    <select value={category} onChange={handleChange}> 
                        <option value="general">General</option>
                        <option value="sports">Sports</option>
                        <option value="science">Science</option>
                        <option value="technology">Technology</option>
                    </select>
                </form>
                <div>
                    {currentArticles.length ? (
                        currentArticles.map((article, index) => (
                            <div key={index} className="bg-white overflow-hidden border-b-4 border-blue-500 mb-4 rounded-lg shadow-lg">
                                {article.urlToImage && (
                                    <div className="mb-2">
                                        <img src={article.urlToImage} alt={article.title} className="w-full object-cover h-32 sm:h-48 md:h-64" />
                                    </div>
                                )}
                                <div className="p-4 md:p-6">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{article.title}</h3>
                                    </a>
                                    <div className="text-sm flex items-center text-gray-600 mb-2">
                                        <svg className="opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 97.16 97.16">
                                            <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823 c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z"/>
                                            <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832 c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z"/>
                                        </svg>
                                        <p className="leading-none">{new Date(article.publishedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-gray-700">
                                        {article.description}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Loading news...</div>
                    )}
                </div>
                {/* Pagination */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <p>{currentPage}/{newsData.length/articlesPerPage}</p>
                    <p>{category}</p>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastArticle >= newsData.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;


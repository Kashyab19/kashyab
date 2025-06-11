import React, { useState, useEffect } from 'react';

const DemoCard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace this URL with your Substack RSS feed URL
        const substackRSSUrl = 'https://kashyabnarrates.substack.com/feed';
        
        fetch(substackRSSUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                const articlesList = Array.from(items).map(item => ({
                    title: item.querySelector("title").textContent,
                    link: item.querySelector("link").textContent,
                    date: new Date(item.querySelector("pubDate").textContent).toLocaleDateString(),
                    description: item.querySelector("description").textContent
                }));
                setArticles(articlesList);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching Substack articles:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Latest Articles</h2>
                <div className="space-y-4">
                    {articles.map((article, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <a 
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:bg-gray-50 transition-colors duration-200"
                            >
                                <h3 className="text-md font-medium text-gray-900 mb-1">{article.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{article.date}</p>
                                <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DemoCard;

import React from 'react';

const DemoCard = () => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">I built a crontab visualizer..</h2>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                        src="https://www.loom.com/embed/d7c3f84116d740b1934f7aaf448c350d?sid=2cb8d4a3-5740-4b58-9c98-70283e3c741c"
                        frameBorder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                        title="Loom Video"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default DemoCard;

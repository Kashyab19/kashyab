import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { videos } from "../../data/personal.jsx";
import { useSEO } from "../../hooks/useSEO";
import "./VideoGallery.css";

function VideoCard({ video }) {
  // Extract YouTube video ID from various URL formats
  const getEmbedUrl = (youtubeId) => {
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  };

  const getYouTubeUrl = (youtubeId) => {
    return `https://www.youtube.com/watch?v=${youtubeId}`;
  };

  return (
    <div className="video-card">
      <div className="video-card-header">
        <h3 className="video-card-title">{video.title}</h3>
        <div className="video-card-header-links">
          <a
            href={getYouTubeUrl(video.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card-youtube-link"
            aria-label={`Watch "${video.title}" on YouTube`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
            </svg>
          </a>
          {video.github && (
            <a
              href={video.github}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card-github-link"
              aria-label={`View ${video.title} on GitHub`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 16.623 4.487 20.536 8.624 21.977C9.124 22.066 9.309 21.756 9.309 21.484C9.309 21.242 9.3 20.579 9.295 19.763C6.766 20.313 6.182 18.615 6.182 18.615C5.73 17.461 5.053 17.151 5.053 17.151C4.087 16.495 5.126 16.509 5.126 16.509C6.193 16.584 6.755 17.605 6.755 17.605C7.707 19.229 9.272 18.758 9.892 18.5C9.981 17.834 10.244 17.383 10.535 17.135C8.418 16.885 6.2 16.084 6.2 12.493C6.2 11.47 6.564 10.62 7.178 9.94C7.081 9.69 6.767 8.694 7.27 7.408C7.27 7.408 8.069 7.142 9.287 8.057C10.043 7.846 10.856 7.74 11.668 7.736C12.48 7.74 13.294 7.846 14.051 8.057C15.268 7.142 16.066 7.408 16.066 7.408C16.57 8.694 16.255 9.69 16.158 9.94C16.774 10.62 17.136 11.47 17.136 12.493C17.136 16.094 14.915 16.883 12.792 17.129C13.143 17.428 13.452 18.02 13.452 18.92C13.452 20.213 13.439 21.17 13.439 21.484C13.439 21.758 13.62 22.07 14.129 21.976C18.265 20.534 21.25 16.622 21.25 12C21.25 6.201 16.549 1.5 10.75 1.5H12Z" fill="currentColor"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      
      {video.description && (
        <p className="video-card-description">{video.description}</p>
      )}

      <div className="video-embed-wrapper">
        <iframe
          src={getEmbedUrl(video.youtubeId)}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-embed"
        />
      </div>

      <div className="video-card-footer">
        <div className="video-card-tags">
          {video.tags && video.tags.map((tag, index) => (
            <span key={index} className="video-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoGallery() {
  useSEO({
    title: "Galleria de Tecnologia",
    description: "Product demos and project walkthroughs showcasing my work and technical projects.",
  });

  const [selectedYear, setSelectedYear] = useState("all");

  // Get unique years from videos, sorted descending
  const availableYears = useMemo(() => {
    const years = [...new Set(videos.map(video => video.year))].sort((a, b) => b - a);
    return years;
  }, []);

  // Filter videos by selected year
  const filteredVideos = useMemo(() => {
    if (selectedYear === "all") {
      return videos;
    }
    return videos.filter(video => video.year === parseInt(selectedYear));
  }, [selectedYear]);

  // Sort videos by year (newest first), then by title
  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredVideos]);

  if (videos.length === 0) {
    return (
      <main className="app-container">
        <div style={{ marginBottom: "24px" }}>
          <Link to="/" className="writings-link" style={{ fontSize: "16px" }}>
            ← Home
          </Link>
        </div>
        <h2 className="page-heading">Galleria de Tecnologia</h2>
        <p className="text-body">No videos available yet.</p>
      </main>
    );
  }

  return (
    <main className="app-container">
      <div style={{ marginBottom: "24px" }}>
        <Link to="/" className="writings-link" style={{ fontSize: "16px" }}>
          ← Home
        </Link>
      </div>

      <div className="video-gallery-header">
        <h2 className="page-heading">Galleria de Tecnologia</h2>
        {availableYears.length > 0 && (
          <div className="video-filter-container">
            <label htmlFor="year-filter" className="video-filter-label">
              Filter by year:
            </label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="video-filter-select"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <p className="text-body">
        Product demos and walkthroughs of projects I've built. These videos showcase the functionality and features of various applications and systems.
      </p>

      {sortedVideos.length === 0 ? (
        <p className="text-body">No videos found for the selected year.</p>
      ) : (
        <div className="video-gallery-grid">
          {sortedVideos.map((video, index) => (
            <VideoCard key={`${video.youtubeId}-${index}`} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}

export default VideoGallery;

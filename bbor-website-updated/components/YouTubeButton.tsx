'use client'

export default function YouTubeButton() {
  return (
    <a
      href="https://www.youtube.com/@BBOR-bd4pj"
      target="_blank"
      rel="noopener noreferrer"
      className="youtube-btn"
    >
      <span>
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        YouTube
      </span>

      <style jsx>{`
        .youtube-btn {
          background: transparent;
          position: relative;
          padding: 5px 15px;
          display: inline-flex;
          align-items: center;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid rgb(255 0 0);
          border-radius: 25px;
          outline: none;
          overflow: hidden;
          color: rgb(255 0 0);
          transition: color 0.3s 0.1s ease-out;
          text-align: center;
        }

        .youtube-btn span {
          margin: 10px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .youtube-btn::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          content: "";
          border-radius: 50%;
          display: block;
          width: 20em;
          height: 20em;
          left: -5em;
          text-align: center;
          transition: box-shadow 0.5s ease-out;
          z-index: 1;
        }

        .youtube-btn:hover {
          color: #fff;
          border: 1px solid rgb(255 0 0);
        }

        .youtube-btn:hover::before {
          box-shadow: inset 0 0 0 10em rgb(255 0 0);
        }
      `}</style>
    </a>
  )
}

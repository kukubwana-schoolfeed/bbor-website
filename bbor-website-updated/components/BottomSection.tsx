'use client'

import Image from 'next/image'

export default function BottomSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/IMG-20240924-WA0018-300x300.png"
          alt="BBOR Children"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-2xl md:text-3xl text-white leading-relaxed mb-12 font-light">
          BBOR supports orphaned and vulnerable children by connecting with them through local outreach and community partnerships. We provide shelter for 230 children at our Lusaka facility, funded by local donations of food, clothing and other essentials. However, due to Zambia's economic challenges, our need for regular donors and sponsors is growing.
        </p>

        <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
          Our program aims to expand and meet the needs of all children in our care, including education and basic necessities. We are actively seeking global support to sustain and grow our efforts.
        </p>

        <p className="text-xl md:text-2xl text-white font-medium mb-12">
          Thank you for your contributions and prayers. May you be rewarded for supporting these children's education and well-being. Ameen.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-6 justify-center items-center">
          <a
            href="https://www.youtube.com/@BBOR-bd4pj"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-circle-btn"
            aria-label="Visit our YouTube channel"
          >
            <div className="sign">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="text">YouTube</div>
          </a>

          <a
            href="https://wa.me/260973158210"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-circle-btn"
            aria-label="Contact us on WhatsApp"
          >
            <div className="sign">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div className="text">WhatsApp</div>
          </a>
        </div>
      </div>

      <style jsx>{`
        .youtube-circle-btn,
        .whatsapp-circle-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition-duration: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
        }

        .youtube-circle-btn {
          background-color: #ff0000;
        }

        .whatsapp-circle-btn {
          background-color: #00d757;
        }

        .sign {
          width: 100%;
          transition-duration: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sign svg {
          width: 25px;
          fill: white;
        }

        .text {
          position: absolute;
          right: 0%;
          width: 0%;
          opacity: 0;
          color: white;
          font-size: 1.2em;
          font-weight: 600;
          transition-duration: 0.3s;
        }

        .youtube-circle-btn:hover,
        .whatsapp-circle-btn:hover {
          width: 150px;
          border-radius: 40px;
          transition-duration: 0.3s;
        }

        .youtube-circle-btn:hover .sign,
        .whatsapp-circle-btn:hover .sign {
          width: 30%;
          transition-duration: 0.3s;
          padding-left: 10px;
        }

        .youtube-circle-btn:hover .text,
        .whatsapp-circle-btn:hover .text {
          opacity: 1;
          width: 70%;
          transition-duration: 0.3s;
          padding-right: 10px;
        }

        .youtube-circle-btn:active,
        .whatsapp-circle-btn:active {
          transform: translate(2px, 2px);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        section:hover .relative.z-10 {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

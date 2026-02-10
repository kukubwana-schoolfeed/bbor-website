'use client'

export default function InfoCards() {
  const cards = [
    {
      title: 'HUMANITARIAN SERVICES',
      description: 'BBOR provides essential support to vulnerable children, focusing on food, shelter, education and healthcare, regardless of race or social class.',
      color: 'bg-gradient-to-br from-red-600 to-red-700',
      icon: '🤲',
    },
    {
      title: 'CHILD CARE AND SUPPORT',
      description: 'BBOR cares for 350 orphaned and vulnerable children, offering them meals, education, clothing and recreational activities.',
      color: 'bg-gradient-to-br from-gray-600 to-gray-700',
      icon: '👶',
    },
    {
      title: 'EDUCATIONAL ACHIEVEMENTS',
      description: 'BBOR has a 100% pass rate in national exams and has produced professionals in various fields through quality education and vocational training.',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      icon: '🎓',
    },
    {
      title: 'ONGOING PROGRAMS',
      description: 'BBOR houses and supports 230 female orphans annually, providing essentials like food, clothing, education and medical care to those in need.',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      icon: '🏡',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`info-card ${card.color} text-white p-8 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
            >
              <div className="text-6xl mb-6">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4 leading-tight">{card.title}</h3>
              <p className="text-white/90 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .info-card {
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }

        .info-card:hover::before {
          opacity: 1;
          transform: translate(25%, -25%);
        }

        .info-card:hover {
          box-shadow: 0 20px 60px rgba(169, 65, 212, 0.4);
        }
      `}</style>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function OrphanStories() {
  const [expanded, setExpanded] = useState(false)

  const stories = [
    {
      name: 'Katema Lenard',
      image: '/images/katema.png',
      story: `My name is Katema Lenard and I am in grade five (5). I was a street boy and quite unfortunate, I had a miserable life on the streets. Most of the times, we used to sleep on an empty stomach because we could not afford to have any meals. At times, I used to sleep on stony bridges and roads because we could not afford shelter.

However, through begging, I met sister Jameelah and did not only offer me a chance to go to school but eventually education has become a blessing such that I am now able to read and write.

Fortunately, through Beautiful Beginnings Outreach Relief (BBOR), my life has completely changed and has meaning and guidance. Currently, she has accommodated me at BBOR orphanage and I have a lovely family.`,
    },
    {
      name: 'Amaal Angela Povia',
      image: '/images/amal.png',
      story: `My name is Amaal Angela Povia and I am 16 years of age. I lived happily with my mother and father together with my siblings as a happy family.

Unfortunately, my father passed away. Thereafter, my mother started struggling just to feed us and manage our daily basic needs. Fortunately, she was guided by her cousin on how BBOR aids vulnerable families and the orphaned.

My experience under BBOR ever since auntie Jameelah took us in as a family, I have learnt how to read and write. BBOR has been my savior. I am fed, given shelter, love and education.

To the donors out there, your love, support and care means a lot and we will forever cherish it as it saves lives.`,
    },
    {
      name: 'Chambwe Shaidah',
      image: '/images/chambwe.png',
      story: `My name is Chambwe Shaidah and I am 17 years old. My mother died when I was 3 years old. My father developed mental issues and got mad. My grandmother took us in under her care in Chibolya, Zambia.

Life was not easy. We wore torn clothes and could not afford daily meals. I could not read and write. We survived by picking leftover charcoal to sell so our stomachs were not empty.

In 2011, we came across sister Jameelah Ohl. She wished to take us in under BBOR. In 2014, I was taken in and received much love, support in education and a happy family I never had.

BBOR has made me a happy child despite not receiving love from biological parents. May Allah grant you Jannah for supporting vulnerable and orphaned children.`,
    },
  ]

  if (!expanded) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
            Their Stories
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Meet the children whose lives have been transformed by BBOR
          </p>

          <div className="relative max-w-md mx-auto h-96">
            {stories.map((story, index) => (
              <div
                key={index}
                className="absolute left-0 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105"
                style={{
                  top: `${index * 30}px`,
                  zIndex: stories.length - index,
                  transform: `rotate(${index * -2}deg)`,
                }}
                onClick={() => setExpanded(true)}
              >
                <div className="relative h-80">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                    <p className="text-sm opacity-90">Click to read their inspiring story</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-32">
            <button
              onClick={() => setExpanded(true)}
              className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Read Their Stories
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black">Their Stories</h2>
          <button
            onClick={() => setExpanded(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Preview
          </button>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-8 items-start bg-white rounded-lg p-8 shadow-lg"
            >
              <div className="lg:order-2 w-full lg:w-1/3">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl sticky top-24">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mt-4 text-center text-primary">{story.name}</h3>
              </div>
              <div className="lg:order-1 w-full lg:w-2/3">
                <div className="prose prose-lg max-w-none">
                  {story.story.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

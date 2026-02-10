'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      testimonialsRef.current?.querySelectorAll('.testimonial-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const testimonials = [
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
      story: `ASALAM ALAIKUM!
My name is Amaal Angela Povia and I am 16 years of age and currently I am a resident of Lusaka with the auspice of Beautiful Beginnings Outreach Relief (BBOR). Partly, I lived happily with my mother and father together with my siblings as a happy family.

Unfortunately, while enjoying the beautiful family moments, my father passed away. Thereafter, my mother started struggling just to feed us and manage our daily basic needs. Fortunately, she was guided by her cousin on how Beautiful Beginnings Outreach Relief (BBOR) aids at saving vulnerable families and the orphaned and that was how my existence at BBOR became into being.

However, my experience under BBOR ever since auntie Jameelah took us in as a family, I have learnt how to read and write, proudly BBOR has been my savior to a being I am currently. Additionally, BBOR has blessed a being I am cause I least lack, I am fed, am given shelter, love and education.

Lastly, I wish to pour love to the donors out there, your love, support and care means a lot and we will forever be cherishes it saves lives out there.`,
    },
    {
      name: 'Tembo Zeenat',
      image: '/images/tembo.png',
      story: `My name is Tembo Zeenat and I am 23 years old. I was adopted into the orphanage when I was 4 years old in 2003. Having faced a number of unpleasant moments, I have been with Sister Jameelah and BBOR from Primary to Tertiary Education. Through Beautiful Beginnings Outreach Relief (BBOR), In 2022 I graduated with a fruitful Diploma in Educational science.

However, without BBOR, life would have been terrible especially people of my gender because girls are always vulnerable in every single country and most of them would be in early Marriages or prostitution.

Lastly, to potential donors out there, I am an example of BBOR, your donations will not go in vain as they will help thousands of people.`,
    },
    {
      name: 'Chambwe Shaidah',
      image: '/images/chambwe.png',
      story: `They say; "Charity does not only help Muslims to get closer to Allah and purify their souls it also has many rewards that are mentioned in many Hadiths about charity." My name is Chambwe Shaidah and I am 17 years old. I am a resident of Lusaka and am currently at BBOR. I am the third born in a family of four (4).

However, Beautiful Beginnings Outreach Relief (BBOR) has been a blessing unto my life particularly. My mother died when I was 3 years old. Unfortunately, just after death my father developed mental issues and suddenly got mad. Thereafter, my grandmother who lived in chibolya, Zambia took us in under her care and support together with my siblings. Honestly, life in Chibolya was not easy and basically my siblings and I used to wear torn clothes and could not afford daily meals.

I could not read and write and our survival was based on picking left over charcoal in turn of selling them so that our stomachs were not empty. Fortunately in 2011, my siblings and I would fend for ourselves through begging. We came across a car which a white woman called Jameelah Ohl owned.

With a view of how we looked; she inquired if we were in school; hence we responded negatively. As a result, she wished to have a word with our guardian and upon updating grandmother, she wished to take us in under BBOR.

Fruitfully in 2014, I was taken in under BBOR and I received much love, support in education and a happy family I never had. My experience being at Beautiful Beginnings Outreach Relief (BBOR) has made me a happy child despite not receiving love from a biological mother and father.

Lastly, to everyone out there with a view of wanting to support our being at BBOR, may Allah grant you Jannah so that vulnerable and orphaned children are saved by its programs.

Prophet Muhammad said, "I will be with the person who helps the orphans closely in Paradise." Meaning that whoever helps an orphan will be promised Jannah and will be close to the Prophet in Paradise. May the Almighty bless you and increase your wealth.`,
    },
    {
      name: 'Bharuchi Latifa',
      image: '/images/latifa.png',
      story: `My name is Bharuchi Latifa and I am currently 21 years old. I did my Cambridge grade 11 (eleven) at Licef secondary school and also completed a short course and acquired a certificate in computers (I.T) at Makeni vocational training college. I am a single orphan and I grew up with my grandmother from my fathers side of the family. Fortunately, when I was 15, I met Jameelah Ohl from BBOR and I was welcomed with open arms. I was a difficult child, rebellious and headstrong, hence my closeness with Jameelah Ohl as I troubled her a lot. Despite everything she showered me with love and comfort and constantly advised me to never give up. Through BBOR's support, I am pursuing my studies in psychology and counseling and helping Jameelah Ohl execute her work under beautiful beginnings outreach relief (BBOR) as I am an exceptionally hard working individual with keen interest in a lot of things. I am confident in taking leadership when needed, but also understand how to delegate tasks and be part of a team. I enjoy helping Jameelah Ohl as I am learning a lot of skills, prowess and bettering my experiences. BBOR is generous to the poor orphans, vulnerable and those in need. I suggest you invest your time, talent and resources for these orphans and vulnerable so they can have much happier and healthier lives.`,
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section with Graduation Image */}
      <section className="relative h-96 overflow-hidden group">
        <Image
          src="/images/IMG-20230715-WA0004.png"
          alt="BBOR Graduation"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">About BBOR</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transforming lives through love, education, and support since 2017
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">Our Mission</h2>
            <p className="text-2xl text-primary font-semibold mb-8">
              "Preparations towards happy endings for orphans and vulnerable children in Zambia"
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Beautiful Beginnings Outreach Relief (BBOR), we are committed to transforming the lives of orphans and vulnerable children in Zambia. Since our founding in 2017, we have dedicated ourselves to providing hope, security and a brighter future for these children.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-black">Who We Are</h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Beautiful Beginnings Outreach Relief (BBOR) is a non-political, non-profit organization registered under the laws of Zambia. We hold a strong belief that every orphan and vulnerable child deserves a "beautiful beginning" to their life, which will set them on a path to a secure and dignified future.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our work is driven by our sincere belief that caring for orphaned and vulnerable children is a communal responsibility. With this in mind, we offer comprehensive support to these children, ensuring they have access to the same opportunities as others.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently, BBOR provides care and support for over 350 orphaned and vulnerable children. Our dedicated team of 30 staff members, which includes doctors, educators, caregivers and volunteers, ensures that each child receives personalized care, nutritious meals, quality education and recreational activities.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20240924-WA0031-300x300.png"
                alt="BBOR Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Shelter</h3>
              <p className="text-gray-700">Providing housing for 230 orphans year-round in a safe, loving environment.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Nutrition</h3>
              <p className="text-gray-700">Offering nutritious meals to 350 orphans and vulnerable children daily.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Education</h3>
              <p className="text-gray-700">Delivering quality education and Islamic studies to over 350 children with a 100% pass rate.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Healthcare</h3>
              <p className="text-gray-700">Ensuring access to medical, dental, and psychological care for all children.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Vocational Training</h3>
              <p className="text-gray-700">Equipping children with practical skills for future self-sufficiency.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Hafiz Programs</h3>
              <p className="text-gray-700">Supporting children in memorizing the Quran alongside their education.</p>
            </div>
          </div>

          <div className="bg-primary text-white rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6">Our Achievements</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Providing housing, education, clothing, and healthcare for hundreds of children since 2017</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Maintaining a 100% pass rate in national exams, creating pathways for children to pursue further education</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Offering vocational skills training to equip children with tools for future self-sufficiency</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Acquiring land and constructing facilities that provide a safe and nurturing environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Supporting children in memorizing large portions of the Quran through Hafiz programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Helping youth pursue careers in healthcare, business, education and more</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges & Future */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold mb-6 text-black">Challenges We Face</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Limited funding to support our growing number of children and maintain facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Lack of permanent infrastructure, leading to rental costs that increase expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Insufficient resources to expand services to meet increasing community needs</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold mb-6">Our Future Plans</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Construct a permanent orphanage with capacity for 350 children</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Provide specialized care for children with autism through early intervention programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Acquire reliable transportation for daily operations and educational tours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Expand vocational training and rehabilitation services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <BottomSection />
    </div>
  )
}

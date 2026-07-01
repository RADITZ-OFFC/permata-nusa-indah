import HeroSection          from '../sections/HeroSection'
import StatsSection         from '../sections/StatsSection'
import FeaturedProperties   from '../sections/FeaturedProperties'
import WhyUsSection         from '../sections/WhyUsSection'
import VirtualTourSection   from '../sections/VirtualTourSection'
import TestimoniSection     from '../sections/TestimoniSection'
import KprCalculatorSection from '../sections/KprCalculatorSection'
import LocationSection      from '../sections/LocationSection'
import CTASection           from '../sections/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <WhyUsSection />
      <VirtualTourSection />
      <TestimoniSection />
      <KprCalculatorSection />
      <LocationSection />
      <CTASection />
    </main>
  )
}

<template>
  <div>
    <!-- Page Header -->
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Affordable web design and digital solutions for small businesses across South Wales.
          From simple brochure sites to complex bespoke applications.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-list-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="services-list-heading" class="sr-only">All Services</h2>
        <div class="space-y-16">

          <!-- Small Business Websites -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🎨</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">Small Business Websites</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  A professional website is your most important business tool. We design and build fast, mobile-friendly
                  websites for local businesses in Bridgend, Cardiff, Swansea, and across South Wales — at a price that
                  makes sense for small businesses.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in smallBizFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <!-- eCommerce -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🛒</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">eCommerce for Small Businesses</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  Start selling online. We build fully-featured online shops for small businesses — with secure payment
                  processing, product management, stock tracking, and everything you need to run a successful online store.
                  No monthly subscription platforms required.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in ecomFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <!-- Booking Sites -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">📅</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">Booking &amp; Appointment Sites</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  Let your customers book appointments, classes, or services online — 24/7, without phone calls or back-and-forth
                  emails. We build and integrate booking systems tailored to your business, and can connect to platforms you
                  already use like Booksy or Square.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in bookingFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
            <div class="mt-8 rounded-xl bg-primary/5 border border-primary/10 p-5">
              <p class="text-sm font-semibold text-text mb-1">Integrations we work with</p>
              <p class="text-sm text-text-light">Booksy &bull; Square (Squared Up) &bull; Custom booking systems &bull; Google Calendar &bull; Stripe &bull; PayPal</p>
            </div>
          </article>

          <!-- Information / Brochure Sites -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">📋</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">Business Information &amp; Brochure Sites</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  Not every business needs an online store — sometimes you just need a great-looking site that tells customers
                  who you are, what you do, and how to reach you. We build clean, fast information sites that rank well in
                  Google and work on every device.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in infoFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <!-- Bespoke Development -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">⚙️</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">Bespoke Web Applications &amp; Software</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  Need something off-the-shelf can't deliver? We design and build fully custom web applications, internal
                  business tools, client portals, dashboards, and workflow systems — engineered for security, reliability,
                  and long-term maintainability.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in bespokeFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
            <div class="mt-10 border-t border-border pt-8">
              <h3 class="text-lg font-semibold text-text mb-4">How We Approach Delivery</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="item in deliveryApproach" :key="item.title" class="rounded-lg border border-border bg-white px-4 py-4">
                  <p class="font-semibold text-text text-sm">{{ item.title }}</p>
                  <p class="mt-1 text-text-light text-sm leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </article>

          <!-- Integrations -->
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🔗</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text">Integrations &amp; Third-Party Connections</h2>
                <p class="mt-2 text-text-light leading-relaxed max-w-3xl">
                  Already using tools like Booksy, Square, Mailchimp, or a CRM? We can connect your website to the
                  platforms and services you depend on, automating workflows and keeping your data in sync.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in integrationFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import CallToAction from '../components/home/CallToAction.vue'

const smallBizFeatures = [
  'Mobile-first, responsive design',
  'Google-optimised (local SEO)',
  'Fast loading speeds',
  'Contact forms and live chat integration',
  'Google Maps integration',
  'Social media links and feeds',
  'Professional photography-ready layouts',
  'Easy to update content',
]

const ecomFeatures = [
  'Product catalogue and management',
  'Secure checkout and payment processing',
  'Stripe, PayPal, and card payment integration',
  'Stock and inventory management',
  'Order management and email notifications',
  'Discount codes and promotions',
  'Mobile-optimised shopping experience',
  'Google Shopping integration',
]

const bookingFeatures = [
  'Online booking and appointment scheduling',
  'Real-time availability calendar',
  'Automatic email and SMS reminders',
  'Staff and resource management',
  'Booksy integration',
  'Square (Squared Up) integration',
  'Custom booking flows for your business',
  'Payment-at-booking support',
]

const infoFeatures = [
  'Professional multi-page website',
  'About, Services, Contact, and Gallery pages',
  'Local SEO — rank for searches in your area',
  'Google Business Profile connection',
  'Fast, accessible, and WCAG-friendly',
  'Schema markup for search rich results',
  'Blog-ready for content marketing',
  'Analytics setup (GA4)',
]

const bespokeFeatures = [
  'Custom web application development',
  'Internal business tools and dashboards',
  'Client and customer portals',
  'API and backend development',
  'Database design and optimisation',
  'Automated testing and CI/CD pipelines',
  'Third-party API integrations',
  'Ongoing support and maintenance',
]

const integrationFeatures = [
  'Booksy booking integration',
  'Square / Squared Up integration',
  'Stripe and payment gateway connections',
  'Mailchimp and email marketing',
  'CRM integrations (HubSpot, Zoho, etc.)',
  'Google Analytics and Search Console',
  'WhatsApp Business and live chat',
  'Custom API development',
]

const deliveryApproach = [
  {
    title: 'Discovery and Scoping',
    description: 'We define business goals, technical requirements, and delivery milestones before development begins.',
  },
  {
    title: 'Build and Iterate',
    description: 'Incremental delivery with regular demos, feedback loops, and quality checks throughout the build.',
  },
  {
    title: 'Launch and Improve',
    description: 'A production-ready release process with post-launch refinements based on real usage insights.',
  },
]
</script>

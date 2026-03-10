<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="testimonials-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="Hear what our clients have to say about working with us.">
        Client Testimonials
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.author"
          class="bg-surface rounded-lg p-6 lg:p-8 border border-border"
        >
          <svg class="w-8 h-8 text-accent/40 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
          </svg>
          <blockquote>
            <p class="text-text leading-relaxed mb-4">{{ testimonial.quote }}</p>
            <footer class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm" aria-hidden="true">
                {{ testimonial.author.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <cite class="not-italic font-semibold text-text text-sm block">{{ testimonial.author }}</cite>
                <span class="text-text-light text-sm">{{ testimonial.role }}, {{ testimonial.company }}</span>
              </div>
            </footer>
          </blockquote>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'

const testimonials = [
  {
    quote: 'Vanguard Digital Solutions delivered our procurement system ahead of schedule and under budget. Their understanding of government compliance requirements was exceptional.',
    author: 'Sarah Mokoena',
    role: 'CIO',
    company: 'Provincial Government',
  },
  {
    quote: 'The team\'s technical expertise and professionalism during the tender process gave us the confidence to award the contract. The final product exceeded our expectations.',
    author: 'James van der Merwe',
    role: 'IT Director',
    company: 'National Agency',
  },
  {
    quote: 'From bid preparation to final deployment, Vanguard was a reliable partner. Their ongoing support has been instrumental in maintaining system performance.',
    author: 'Thandi Nkosi',
    role: 'Programme Manager',
    company: 'Enterprise Corp',
  },
]
</script>

<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Building trusted partnerships through technology and tender expertise.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="our-story">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <h2 id="our-story" class="text-3xl font-bold text-text mb-6">Our Story</h2>
          <div class="space-y-4 text-text-light leading-relaxed">
            <p>
              Vanguard Digital Solutions was founded with a clear mission: to bridge the gap between
              government procurement requirements and modern software solutions. We recognised that
              many organisations struggle to navigate the complexities of tender processes while
              simultaneously delivering technically excellent products.
            </p>
            <p>
              Our team brings together deep expertise in public sector procurement, software engineering,
              and project management. This unique combination allows us to guide clients through every
              stage — from initial bid preparation to final system deployment and ongoing support.
            </p>
            <p>
              Based in South Africa, we serve government departments, state-owned enterprises, and
              large private organisations that require compliant, secure, and scalable digital solutions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="values-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="The principles that guide everything we do.">
          Our Values
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="value in values" :key="value.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ value.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text mb-2">{{ value.title }}</h3>
            <p class="text-text-light text-sm leading-relaxed">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="team-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Experienced professionals dedicated to your success.">
          Our Team
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="member in team" :key="member.name" class="text-center">
            <div class="w-24 h-24 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4" aria-hidden="true">
              {{ member.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <h3 class="text-lg font-semibold text-text">{{ member.name }}</h3>
            <p class="text-accent font-medium text-sm mb-2">{{ member.role }}</p>
            <p class="text-text-light text-sm leading-relaxed">{{ member.bio }}</p>
          </article>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import SectionHeading from '../components/shared/SectionHeading.vue'
import CallToAction from '../components/home/CallToAction.vue'

const values = [
  {
    icon: '🎯',
    title: 'Integrity',
    description: 'We operate with transparency and honesty in every interaction, from initial engagement through project delivery.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards of quality in code, documentation, and client communication.',
  },
  {
    icon: '🔒',
    title: 'Compliance',
    description: 'We ensure every solution meets regulatory requirements and procurement standards without compromise.',
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'We leverage modern technologies and methodologies to deliver solutions that are future-ready.',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description: 'We view every client relationship as a long-term partnership built on mutual respect and shared goals.',
  },
  {
    icon: '📊',
    title: 'Accountability',
    description: 'We take ownership of our commitments and deliver measurable outcomes on every project.',
  },
]

const team = [
  {
    name: 'David Mthembu',
    role: 'Managing Director',
    bio: 'Over 15 years of experience in public sector IT procurement and software delivery.',
  },
  {
    name: 'Anele Dlamini',
    role: 'Head of Engineering',
    bio: 'Full-stack architect specialising in secure, scalable enterprise systems.',
  },
  {
    name: 'Liezel Botha',
    role: 'Tender Manager',
    bio: 'Expert in government procurement processes with a strong track record of successful bids.',
  },
]
</script>

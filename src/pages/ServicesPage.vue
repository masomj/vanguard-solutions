<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Comprehensive software solutions for businesses and organisations.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-list">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            :features="service.features"
          />
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="process-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="A structured approach to ensure consistent, high-quality delivery.">
          Our Process
        </SectionHeading>

        <div class="mt-12 max-w-3xl mx-auto">
          <div class="space-y-8">
            <article v-for="(step, index) in processSteps" :key="step.title" class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {{ index + 1 }}
                </div>
                <div v-if="index < processSteps.length - 1" class="w-0.5 flex-1 bg-border mt-2"></div>
              </div>
              <div class="pb-8">
                <h3 class="text-lg font-semibold text-text mb-1">{{ step.title }}</h3>
                <p class="text-text-light text-sm leading-relaxed">{{ step.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import ServiceCard from '../components/services/ServiceCard.vue'
import SectionHeading from '../components/shared/SectionHeading.vue'
import CallToAction from '../components/home/CallToAction.vue'

const services = [
  {
    icon: '💻',
    title: 'Custom Software Development',
    description: 'Bespoke applications built to specification, with a focus on security, scalability, and maintainability.',
    features: [
      'Web applications and portals',
      'Mobile-responsive solutions',
      'API development and integration',
      'Database design and optimisation',
      'Automated testing and CI/CD pipelines',
    ],
  },
  {
    icon: '🔗',
    title: 'Systems Integration & Consulting',
    description: 'Strategic advisory and hands-on integration services for complex enterprise environments.',
    features: [
      'Enterprise architecture assessment',
      'Legacy system modernisation',
      'Third-party system integration',
      'Technology stack evaluation',
      'Digital transformation roadmaps',
    ],
  },
  {
    icon: '🛡️',
    title: 'Maintenance & Support',
    description: 'Ongoing technical support, monitoring, and continuous improvement for delivered solutions.',
    features: [
      'Service level agreements (SLAs)',
      'Proactive system monitoring',
      'Security patching and updates',
      'Performance optimisation',
      'User training and knowledge transfer',
    ],
  },
]

const processSteps = [
  {
    title: 'Discovery & Requirements',
    description: 'We begin by understanding your needs, constraints, and objectives through in-depth consultation.',
  },
  {
    title: 'Proposal & Planning',
    description: 'Our team prepares a detailed technical proposal, project plan, and cost estimate for your review.',
  },
  {
    title: 'Design & Architecture',
    description: 'We design the solution architecture, user experience, and technical specifications before development begins.',
  },
  {
    title: 'Development & Testing',
    description: 'Iterative development with continuous testing ensures quality at every stage of the build.',
  },
  {
    title: 'Deployment & Training',
    description: 'We handle deployment, data migration, and provide comprehensive training for your team.',
  },
  {
    title: 'Support & Optimisation',
    description: 'Ongoing monitoring, maintenance, and optimisation to keep your solution performing at its best.',
  },
]
</script>

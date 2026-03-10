<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="We deliver end-to-end solutions tailored to your business needs.">
        What We Do
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in services"
          :key="service.title"
          :icon="service.icon"
          :title="service.title"
          :description="service.description"
        />
      </div>

      <div class="mt-12 text-center">
        <BaseButton to="/services" variant="primary">
          View All Services
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'
import ServiceCard from '../services/ServiceCard.vue'
import BaseButton from '../shared/BaseButton.vue'

const services = [
  {
    icon: '💻',
    title: 'Custom Software Development',
    description: 'Bespoke applications built with modern technologies, designed for scalability, security, and seamless integration with existing systems.',
  },
  {
    icon: '🔗',
    title: 'Systems Integration & Consulting',
    description: 'Strategic guidance on digital transformation, technology stack selection, and seamless integration across your organisation.',
  },
  {
    icon: '🛡️',
    title: 'Maintenance & Support',
    description: 'Ongoing technical support, proactive monitoring, and continuous improvement to keep your systems running at their best.',
  },
]
</script>

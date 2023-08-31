<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
    <div v-for="(action, actionIdx) in actions" :key="action.title" :class="[actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', actionIdx === 1 ? 'sm:rounded-tr-lg' : '', actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '', actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '', 'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500']">
      <div>
        <span :class="[action.iconBackground, action.iconForeground, 'inline-flex rounded-lg p-3 ring-4 ring-white']">
          <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <a :href="action.href" class="focus:outline-none">
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            {{ action.title }}
          </a>
        </h3>
        <p class="mt-2 text-sm text-gray-500">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
      </div>
      <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>

      <!-- how much you can earn from this challenge -->

      <div class="mt-8 flex items-center justify-end">

        <p class="text-lg font-bold">30</p>

        <svg width="24px" fill="orange" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="m600 37.5c-310.11 0-562.5 252.38-562.5 562.5s252.39 562.5 562.5 562.5 562.5-252.38 562.5-562.5-252.39-562.5-562.5-562.5zm297.98 512.11-90.016 89.559c-7.1055 7.0859-12.047 25.637-9.4102 35.375l42.043 153.22c7.2891 26.75 0 43.91-7.3984 53.594-9.0469 11.848-23.035 18.641-38.453 18.641-11.352 0-23.219-3.625-35.23-10.805l-141.72-84.633c-6.1523-3.625-29.406-3.6641-35.633 0.035156l-141.72 84.594c-28.16 16.828-57.934 12.781-73.645-7.8203-7.3984-9.7031-14.684-26.863-7.3984-53.578l42.043-153.35c2.6367-9.6484-2.3086-28.199-9.4492-35.32l-89.977-89.539c-26.477-26.293-21.352-51.945-17.945-61.762 3.4414-9.8164 15.453-33.105 52.66-37.207l108.36-11.992c11.535-1.2461 29.625-13.219 35.23-23.273l65.953-118.16c12.34-22.059 31.898-34.672 53.723-34.672s41.383 12.617 53.723 34.645l65.953 118.2c5.6016 10.051 23.695 22.027 35.156 23.273l108.47 11.992c37.172 4.1016 49.184 27.395 52.625 37.207 3.4062 9.8125 8.5352 35.465-17.945 61.777z"/>
        </svg>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  challenges: {
    type: Array,
    required: true,
  },
});

import {
  AcademicCapIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@vue-hero-icons/outline'

const actions = [
  {
    title: 'Improve the docs',
    href: '#',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'Deploy a smart contract',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Finish a course',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'Retweet a post',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Rate the Web IDE',
    href: '#',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Raid a Discord',
    href: '#',
    icon: AcademicCapIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
]
</script>

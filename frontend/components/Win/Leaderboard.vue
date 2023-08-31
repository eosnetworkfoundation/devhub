<template>
  <ul role="list" class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <li v-for="user in users" :key="user.id" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div class="flex gap-x-4">
        <div class="min-w-0 flex-auto flex justify-center items-center text-xs pr-4">
          #1
        </div>
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="user.graphics.avatar" alt="" />
        <div class="min-w-0 flex-auto flex justify-center items-center ml-4">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a :href="`/profile/${user.id}`" class="relative truncate hover:underline">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ user.name }}
            </a>
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="flex gap-1 items-center">

          <div class="text-sm font-bold">{{ user.points }}</div>
          <svg width="24px" fill="orange" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
            <path d="m600 37.5c-310.11 0-562.5 252.38-562.5 562.5s252.39 562.5 562.5 562.5 562.5-252.38 562.5-562.5-252.39-562.5-562.5-562.5zm297.98 512.11-90.016 89.559c-7.1055 7.0859-12.047 25.637-9.4102 35.375l42.043 153.22c7.2891 26.75 0 43.91-7.3984 53.594-9.0469 11.848-23.035 18.641-38.453 18.641-11.352 0-23.219-3.625-35.23-10.805l-141.72-84.633c-6.1523-3.625-29.406-3.6641-35.633 0.035156l-141.72 84.594c-28.16 16.828-57.934 12.781-73.645-7.8203-7.3984-9.7031-14.684-26.863-7.3984-53.578l42.043-153.35c2.6367-9.6484-2.3086-28.199-9.4492-35.32l-89.977-89.539c-26.477-26.293-21.352-51.945-17.945-61.762 3.4414-9.8164 15.453-33.105 52.66-37.207l108.36-11.992c11.535-1.2461 29.625-13.219 35.23-23.273l65.953-118.16c12.34-22.059 31.898-34.672 53.723-34.672s41.383 12.617 53.723 34.645l65.953 118.2c5.6016 10.051 23.695 22.027 35.156 23.273l108.47 11.992c37.172 4.1016 49.184 27.395 52.625 37.207 3.4062 9.8125 8.5352 35.465-17.945 61.777z"/>
          </svg>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>

// take props from parent
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const users = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    graphics: {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    points: 100,
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    graphics: {
      avatar:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    points: 100,
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    graphics: {
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    points: 100,
  },
]
</script>

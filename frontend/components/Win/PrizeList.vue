<template>
    <ul role="list" class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <li v-for="(prize, index) in prizes" :key="index" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto flex justify-center items-center text-lg font-bold">
                    #{{index + 1}}
                </div>
            </div>
            <div class="flex flex-col justify-center items-end">
                <div class="block" v-for="(reward, reward_index) in prize.rewards" :key="reward_index">
                    <div class="text-sm font-bold">{{ reward }}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>

const prizes = [
    {
        rewards: [
            `400 EOS`
        ],
    },
    {
        rewards: [
            `200 EOS`
        ],
    },
    {
        rewards: [
            `100 EOS`
        ],
    },
    {
        rewards: [
            '10 EOS',
            'Gift card'
        ],
    },

];

// take props from parent
// const props = defineProps({
//     users: {
//         type: Array,
//         required: true,
//     },
// });

// const users = [
//     {
//         name: 'Leslie Alexander',
//         email: 'leslie.alexander@example.com',
//         graphics: {
//             avatar:
//                 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         },
//         points: 100,
//     },
//     {
//         name: 'Michael Foster',
//         email: 'michael.foster@example.com',
//         graphics: {
//             avatar:
//                 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         },
//         points: 100,
//     },
//     {
//         name: 'Dries Vincent',
//         email: 'dries.vincent@example.com',
//         graphics: {
//             avatar:
//                 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         },
//         points: 100,
//     },
// ]
</script>

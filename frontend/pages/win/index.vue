<template>
    <section class="win">
        <GenericHeader
            title="Are you the Best?"
            text="Earn rewards with <b>EOS Developer Challenges</b>"
        />

        <section class="mt-20 max-w-[900px] mx-auto">
            <section class="border-b border-gray-200">
                <section class="sm:flex sm:items-baseline">
                    <section class="mt-4 sm:ml-10 sm:mt-0">
                        <section class="-mb-px flex">
                            <figure v-for="(tab, index) in tabs" :key="tab.name" class="cursor-pointer px-8" v-on:click="() => selectTab(index)"
                                    :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']"
                                    :aria-current="tab.current ? 'page' : undefined">
                                {{ tab.name }}
                            </figure>
                        </section>
                    </section>
                </section>
            </section>
        </section>

        <section class="mt-10 max-w-[900px] mx-auto" v-if="tabs[selectedTab].name === 'Prizes'">
            <PrizeList />
        </section>

        <section class="mt-10 max-w-[900px] mx-auto" v-if="tabs[selectedTab].name === 'Leaderboard'">
            <Leaderboard />
        </section>

        <section class="mt-10 max-w-[900px] mx-auto" v-if="tabs[selectedTab].name === 'Challenges'">
            <ChallengeGrid />
        </section>

    </section>
</template>

<script setup>
import {ref} from "vue";
import PrizeList from "@/components/Win/PrizeList";

const selectedTab = ref(0);
const tabs = ref([
    { name: 'Leaderboard', current: true },
    { name: 'Challenges', current: false },
    { name: 'Prizes', current: false },
]);

const selectTab = (index) => {
    selectedTab.value = index;
    tabs.value.forEach((tab, i) => {
        tab.current = i === index;
    });
}
</script>

<script>
import ChallengeGrid from "~/components/Win/ChallengeGrid";
import Leaderboard from "~/components/Win/Leaderboard";
export default {
    name: 'Earn',
    components: {Leaderboard, ChallengeGrid},
    head() {
        return this.$common.head();
    },
    data(){return {
        challenges:[],
    }},
    async fetch() {
        this.challenges = await this.$api.getChallenges();
    },
}
</script>

<style lang="scss" scoped>
.win {

    .panels {


    }


}

</style>

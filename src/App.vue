<script setup lang="ts">
import logo from '@/assets/covid.svg'
import banner from '@/assets/banner.jpg'
import Sidebar from '@/components/Sidebar.vue';
import Skeleton from '@/components/Skeleton.vue';
import Card from '@/components/Card.vue';
import { useGetContries } from '@/services/covid/useCovid'
import { computed, ref, watchEffect } from 'vue';
import type { ICard, ICountryData } from '@/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

const menuOpen = ref(true);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const { data, isLoading } = useGetContries();


const contries = computed(() => {
  return data.value?.data.map((d: ICountryData) => d.country) ?? [];
});

const contriesConfirmed = computed(() => {
  return data.value?.data.map((d: ICountryData) => d.confirmed) ?? [];
});

const totalCases = computed(() => {
  return data.value?.data.reduce((total: number, countryData: ICountryData) => total + countryData.cases, 0) ?? 0;
});

const totalConfirmed = computed(() => {
  return data.value?.data.reduce((total: number, countryData: ICountryData) => total + countryData.confirmed, 0) ?? 0;
});

const totalDeaths = computed(() => {
  return data.value?.data.reduce((total: number, countryData: ICountryData) => total + countryData.deaths, 0) ?? 0;
});

const totalRecovered = computed(() => {
  return data.value?.data.reduce((total: number, countryData: ICountryData) => total + countryData.recovered, 0) ?? 0;
});


const getUpdatedCards = () => {
  return [
    {
      id: 1,
      label: 'Total Cases',
      labelColor: 'text-red-600',
      value: totalCases.value
    },
    {
      id: 2,
      label: 'Total Confirmed',
      labelColor: 'text-red-600',
      value: totalConfirmed.value
    },
    {
      id: 3,
      label: 'Total Deaths',
      labelColor: 'text-red-600',
      value: totalDeaths.value
    },
    {
      id: 4,
      label: 'Total Recovered',
      labelColor: 'text-green-600',
      value: totalRecovered.value
    },
  ];
};

const cards = ref<ICard[]>(getUpdatedCards());
watchEffect(() => {
  cards.value = getUpdatedCards();
});


// Chart config
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const dataChart = computed(() => {
  const labels = contries.value;
  const datasets = [{
    label: 'Confirmed Cases', backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1, data: contriesConfirmed.value
  }];

  if (!Array.isArray(labels)) {
    console.error("Error: 'labels' is not an array", labels);
    return { labels: [], datasets };
  }

  return { labels, datasets };
});

</script>

<template>
  <div class="flex">
    <Sidebar :menuOpen="menuOpen" @toggleMenu="toggleMenu" />
    <main :class="menuOpen ? 'ml-20' : ''" class="flex-1 h-screen ">
      <div class="w-full p-1 px-4 pl-4 md:pl-12  border-b  border-blue-text">
        <img :src="logo" class="w-40" />
      </div>
      <div class="p-2">
        <div class="mx-auto w-11/12" v-if="isLoading">
          <Skeleton />
        </div>
        <div v-else>
          <div class="mx-auto w-11/12">
            <h2 class="text-2xl font-semibold p-4">Covid-19 Tracker</h2>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
              <Card v-for="card in cards" :key="card.id" :label="card.label" :labelColor="card.labelColor"
                :value="card.value" />
            </div>
            <Bar :data="dataChart" class="bg-blue-card p-2 rounded-lg" :options="{ responsive: true }" />

            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-center  my-4">
              <Table class="my-4 p-4  bg-blue-card rounded-lg">
                <TableCaption>Statistical data from 5 countries.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-[100px]">
                      Country
                    </TableHead>
                    <TableHead>Total Cases</TableHead>
                    <TableHead>Total Confirmed</TableHead>
                    <TableHead>
                      Total Deaths
                    </TableHead>
                    <TableHead>
                      Total Recovered
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="country in data.data.slice(0, 5)" :key="country.country">

                    <TableCell class="font-medium">
                      {{ country.country }}
                    </TableCell>
                    <TableCell>{{ country.cases ?? 0 }}</TableCell>
                    <TableCell>{{ country.confirmed }}</TableCell>
                    <TableCell>
                      {{ country.deaths ?? 0 }}
                    </TableCell>
                    <TableCell>
                      {{ country.recovered ?? 0 }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div class="h-[85%] pb-2">
                <img class="object-cover h-full w-full" alt="Be safe" style="object-fit: scale-down;" :src="banner" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>


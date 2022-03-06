import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import { TPagination } from 'vue-tailwind/dist/components'

const settings = {
  't-pagination': {
    component: TPagination,
    props: {
      classes: {
        wrapper:
          'table border-collapse text-center bg-white mx-auto text-xs font-medium text-gray-800 shadow-sm rounded-full',
        element:
          'w-7 h-7 border border-gray-300 bg-white table-cell hover:bg-gray-50 font-medium',
        activeElement: 'w-7 h-7 border border-gray-300 table-cell',
        disabledElement: 'w-7 h-7 border border-gray-300 table-cell',
        ellipsisElement: 'w-7 h-7 border border-gray-300 hidden md:table-cell',
        activeButton:
          'bg-gray-50 text-yellow-500 font-bold w-full border-gray-100 h-full hover:bg-gray-100 transition duration-100 ease-in-out focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50',
        disabledButton:
          'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
        button:
          'hover:bg-gray-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50',
        ellipsis: '',
      },
    },
  },
}

Vue.use(VueTailwind, settings)

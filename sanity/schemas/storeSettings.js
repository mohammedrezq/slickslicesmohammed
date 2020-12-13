import { MdStore as icon } from 'react-icons/md';

export default {
    // computer name
    name: "storeSettings",
    // visible name
    title: "Settings",
    type: "document",
    icon,
    fields: [
        {
            name: 'name',
            title: 'Store Name',
            type: 'string',
            description:'Name of the Store',
        },
  {
      name: "slicemaster",
      title: "Slicemaster Currently Slicing ",
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}]
  },
  {
      name: "hotslices",
      title: "Hot Slices available in the case",
      type: 'array',
      of: [{type: 'reference', to: [{type: 'pizza'}]}]
  },
],

};
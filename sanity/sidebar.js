import React from 'react'
import S from '@sanity/desk-tool/structure-builder';

// Build a custom sidebar

const Sidebar = () => {
    return (S.list()
                .title(`Slicks Slices`)
                .items([
                    // Create new subItem
                    S.listItem().title("Home Page").icon(()=> <strong>🔥</strong>)
                    .child(
                        S.editor()
                        .schemaType('storeSettings')
                        // Make new document Id, so we don't have a random string of numbers
                        .documentId('downtown')
                    ),
                    // Adding the rest of our document items
                    ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),

                ])
    );
}

export default Sidebar

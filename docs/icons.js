/* Word by Word — набір піктограм для історій.
   Усі іконки однакового стилю: контур currentColor, 64×64. Порядок збігається з порядком історій у app.js. */
(function () {
  var wrap = function (body) {
    return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  };

  window.WBW_ICONS = [
    /* 1  A Morning Walk — схід сонця */
    wrap('<path d="M6 46h52"/><path d="M18 46a14 14 0 0 1 28 0"/><path d="M32 21v7"/><path d="M18.6 32.6l-4.3-4.3"/><path d="M45.4 32.6l4.3-4.3"/><path d="M22 55h20"/>'),
    /* 2  A New Classmate — двоє людей */
    wrap('<circle cx="24" cy="23" r="7.5"/><path d="M10 52c0-9 6-15 14-15s14 6 14 15"/><circle cx="46" cy="27" r="6"/><path d="M42 38c8-1.5 13 4 13 13"/>'),
    /* 3  A Rainy Afternoon — хмара з дощем */
    wrap('<path d="M17 41h27a9 9 0 0 0 1-18 13 13 0 0 0-25-2 10 10 0 0 0-3 20z"/><path d="M23 49l-3 7"/><path d="M33 49l-3 7"/><path d="M43 49l-3 7"/>'),
    /* 4  The Green Bicycle — велосипед */
    wrap('<circle cx="15" cy="43" r="10"/><circle cx="49" cy="43" r="10"/><path d="M15 43l11-17h16l7 17"/><path d="M26 26l6 17H15"/><path d="M21 24h10"/><path d="M42 26l-2-8h7"/>'),
    /* 5  The Market List — список із позначками */
    wrap('<rect x="14" y="10" width="36" height="46" rx="5"/><path d="M25 10V7h14v3"/><path d="M22 25l3 3 6-7"/><path d="M36 26h8"/><path d="M22 40l3 3 6-7"/><path d="M36 41h8"/>'),
    /* 6  A Birthday Note — конверт */
    wrap('<rect x="8" y="16" width="48" height="34" rx="5"/><path d="M9 20l23 18 23-18"/>'),
    /* 7  A Letter from London — вежа з годинником */
    wrap('<path d="M24 55V27h16v28"/><path d="M22 27l10-15 10 15z"/><path d="M32 12V7"/><circle cx="32" cy="38" r="4.5"/><path d="M18 55h28"/>'),
    /* 8  The Lost Recipe — яблуко */
    wrap('<path d="M32 24c-5-5-17-4-17 10 0 11 8 20 14 20 2 0 2-1 3-1s1 1 3 1c6 0 14-9 14-20 0-14-12-15-17-10z"/><path d="M32 24c0-5 2-9 6-11"/><path d="M39 14c4-1 8 0 9 4-4 1-8 0-9-4z"/>'),
    /* 9  The Friendly Dog — лапа */
    wrap('<path d="M32 34c-8 0-14 6-14 11 0 5 5 7 9 6 3-1 4-1 5-1s2 0 5 1c4 1 9-1 9-6 0-5-6-11-14-11z"/><circle cx="15" cy="28" r="4.5"/><circle cx="25" cy="18" r="4.5"/><circle cx="39" cy="18" r="4.5"/><circle cx="49" cy="28" r="4.5"/>'),
    /* 10 Saturday at the Museum — фасад із колонами */
    wrap('<path d="M8 25l24-13 24 13z"/><path d="M16 30v21"/><path d="M26 30v21"/><path d="M38 30v21"/><path d="M48 30v21"/><path d="M9 56h46"/>'),
    /* 11 The Blue Umbrella — парасолька */
    wrap('<path d="M8 34a24 22 0 0 1 48 0c-3.500-4-8.500-4-12 0-3.500-4-8.500-4-12 0-3.500-4-8.500-4-12 0-3.500-4-8.500-4-12 0z"/><path d="M32 34v16a5 5 0 0 1-10 0"/><path d="M32 12V8"/>'),
    /* 12 A Garden Project — паросток */
    wrap('<path d="M32 55V27"/><path d="M32 45c-9 0-14-5-14-12 9 0 14 5 14 12z"/><path d="M32 37c8 0 13-5 13-12-8 0-13 5-13 12z"/><circle cx="32" cy="17" r="5"/><path d="M18 55h28"/>'),
    /* 13 The New Neighbor — будинок */
    wrap('<path d="M9 32l23-19 23 19"/><path d="M15 28v27h34V28"/><path d="M27 55V40h10v15"/><path d="M34 47.500h.01"/>'),
    /* 14 A Train to the Sea — хвилі й сонце */
    wrap('<circle cx="47" cy="14" r="5.500"/><path d="M6 30q6.500-8 13 0t13 0 13 0 13 0"/><path d="M6 42q6.500-8 13 0t13 0 13 0 13 0"/><path d="M6 54q6.500-8 13 0t13 0 13 0 13 0"/>'),
    /* 15 An Open Window — вікно */
    wrap('<rect x="13" y="8" width="38" height="43" rx="4"/><path d="M32 8v43"/><path d="M13 29.500h38"/><path d="M8 57h48"/>'),
    /* 16 The Old Camera — фотоапарат */
    wrap('<rect x="7" y="21" width="50" height="33" rx="6"/><circle cx="32" cy="38" r="10"/><circle cx="32" cy="38" r="3.500"/><path d="M22 21l3-7h14l3 7"/><path d="M48 29h.01"/>'),
    /* 17 The Quiet Cafe — чашка */
    wrap('<path d="M13 26h31v13a15.500 15.500 0 0 1-31 0z"/><path d="M44 30h4a7 7 0 0 1 0 14h-5"/><path d="M21 18c-3-3 3-5 0-9"/><path d="M31 18c-3-3 3-5 0-9"/><path d="M9 59h39"/>'),
    /* 18 The First Hike — гори */
    wrap('<path d="M5 53l19-31 12 18 8-11 15 24z"/><circle cx="48" cy="13" r="4.500"/>'),
    /* 19 The Small Library — книжки на полиці */
    wrap('<rect x="12" y="16" width="9" height="38" rx="2"/><rect x="24" y="23" width="9" height="31" rx="2"/><rect x="36" y="12" width="9" height="42" rx="2"/><rect x="48" y="22" width="9" height="32" rx="2"/><path d="M6 58h52"/>'),
    /* 20 A Useful Mistake — лампочка */
    wrap('<path d="M32 7a17 17 0 0 0-9.500 31c2 1.500 3 4 3 7h13c0-3 1-5.500 3-7A17 17 0 0 0 32 7z"/><path d="M26 51h12"/><path d="M28.500 57h7"/>'),
    /* 21 The Last Bus — автобус */
    wrap('<rect x="10" y="10" width="44" height="39" rx="8"/><rect x="16" y="17" width="32" height="15" rx="3"/><path d="M10 39h44"/><path d="M20 44h.01"/><path d="M44 44h.01"/><path d="M19 49v7"/><path d="M45 49v7"/>'),
    /* 22 A Map of Voices — позначка на мапі */
    wrap('<path d="M32 57s-18-17-18-32a18 18 0 0 1 36 0c0 15-18 32-18 32z"/><circle cx="32" cy="25" r="6.500"/>'),
    /* 23 The Repair Workshop — шестерня */
    wrap('<g transform="translate(32 32)"><circle r="14"/><circle r="5.500"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(45)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(90)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(135)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(180)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(225)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(270)"/><rect x="-3.500" y="-24" width="7" height="8" rx="1.500" transform="rotate(315)"/></g>'),
    /* 24 The Empty Chair — стілець */
    wrap('<rect x="19" y="7" width="26" height="20" rx="5"/><path d="M22 27v10"/><path d="M42 27v10"/><path d="M13 37h38"/><path d="M18 37v20"/><path d="M46 37v20"/>')
  ];

  /* Власна книжка — розгорнута книжка */
  window.WBW_BOOK_ICON = wrap('<path d="M32 15c-6-4-14-5-23-4v39c9-1 17 0 23 4 6-4 14-5 23-4V11c-9-1-17 0-23 4z"/><path d="M32 15v39"/>');

  /* Стрілка для кнопок і посилань */
  window.WBW_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
})();

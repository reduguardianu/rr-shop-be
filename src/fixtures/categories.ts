import { CategoryFixture, StructuralNode } from '../model';

// tslint:disable:object-literal-sort-keys
export const categoryFixtures: CategoryFixture[] = [
  {
    name: 'Shop categories',
    structuralNode: StructuralNode.ShopCategories,
    children: [
      { name: 'Herbaty', slug: 'herbaty' },
      {
        name: 'Kawy',
        slug: 'kawy',
        children: [{ name: 'Sypane', slug: 'sypane' }, { name: 'Mielone', slug: 'mielone' }]
      },

      { name: 'Dla seniora', slug: 'dla-seniora' },
      { name: 'Jakaś długa nazwa kategorii, która wychodzi poza jedną linię', slug: 'jakas' },
      {
        name: 'Zioła',
        slug: 'ziola',
        children: [
          { name: 'Sypane', slug: 'sypane' },
          {
            name: 'Pakowane',
            slug: 'pakowane',
            children: [{ name: 'Dobrze', slug: 'dobrze' }, { name: 'Bardzo dobrze', slug: 'bardzo-dobrze' }]
          },
          { name: 'Odmładzające', slug: 'odmladzajace' }
        ]
      },
      { name: 'Przyprawy', slug: 'przyprawy' },
      { name: 'Miody', slug: 'miody' }
    ]
  },
  {
    name: 'Pages',
    children: [
      {
        name: 'Header',
        structuralNode: StructuralNode.Header,
        children: [
          { name: 'Nowości', slug: 'nowosci' },
          { name: 'Best sellers', slug: 'best-sellers' },
          { name: 'Kontakt', slug: 'kontakt' }
        ]
      },
      {
        name: 'Footer',
        structuralNode: StructuralNode.Footer,
        children: [
          {
            name: 'Dostawa i płatności',
            isUnAccessible: true,
            children: [
              { name: 'Czas realizacji zamówień', slug: 'czas-realizacji-zamowien' },
              { name: 'Czas dostawy', slug: 'czas-dostawy' },
              { name: 'Dla sklepów', slug: 'dla-sklepow' },
              { name: 'Paragony i faktory', slug: 'paragony-i-faktury' },
              { name: 'Koszty dostawy', slug: 'koszty-dostawy' },
              { name: 'Sposoby płatności', slug: 'sposoby-platnosci' }
            ]
          },
          {
            name: 'Pomoc',
            isUnAccessible: true,
            children: [
              { name: 'Regulamin', slug: 'regulamin' },
              { name: 'Rabaty', slug: 'rabaty' },
              { name: 'Polityka prywatności', slug: 'polityka-prywatnosci' }
            ]
          },
          {
            name: 'O formie',
            isUnAccessible: true,
            children: [
              {
                name: 'Informacje o firmie',
                slug: 'informacje-o-firmie',
                content: `
                  <p>
                    Nasza firma jest bardzo fajna choć jest na rynku od niedawna. Zalety:
                  </p>
                  <ul>
                    <li>Szybko</li>
                    <li>Sprawnie</li>
                    <li>Świetnie</li>
                  </ul>
                  <p>
                    Zapraszamy do zakupów
                  </p>
                `
              },
              { name: 'Opinie klientów', slug: 'opinie-klientow' },
              { name: 'Kontakt', slug: 'kontakt' }
            ]
          },
          {
            name: 'Gdzie nas znaleźć',
            structuralNode: StructuralNode.FooterMap,
            content: '<p>Tarnogajska ??/??<br />50-515 Wrocław</p>'
          }
        ]
      }
    ]
  }
];
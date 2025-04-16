shopping-cart/
├── index.html             # Entry HTML file
├── package.json           # Project dependencies and scripts
├── pnpm-lock.yaml         # Dependency lock file
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── public/                # Static assets (e.g., favicon)
│   └── favicon.ico
├── src/                   # Source code
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│   ├── components/        # Reusable UI components
│   │   ├── CartItem.tsx     # Cart item component
│   │   ├── CartList.tsx    # Cart list
│   │   ├── CheckoutForm.tsx # checkout form
│   │   ├── ProductCard.tsx #Product Card
│   │   └── CanvasThumbnail.tsx # Component to generate thumbnail
│   ├── pages/             # Pages of the application
│   │   ├── CartPage.tsx     # cart page
│   │   └── CheckoutPage.tsx # checkout page
│   ├── store/             # Zustand store
│   │   └── cartStore.ts     # Cart state
│   ├── types/             # type definition
│   │   └── product.ts       # product type
│   ├── data/              # data
│   │   └── products.ts      # test data
│   ├── utils/              # utility function
│   │   └── canvasUtils.ts   # canvas utils
│   └── App.css            # global style
└── prompt/
    └── 购物车.md           # Project instruction

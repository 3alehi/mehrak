import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js"
  ],
  theme: {
  	extend: {
		
  		colors: {
  			lightGray: '#E7E7E7',
  			darkGray: '#5C5C5C',
  			aquaBlue: '#36BABB',
        customRed: '#E3272F', 
        'dark-gray': '#575757',
        'light-gray': '#F2F3F5',
        blush: "#F8CACC", 
        customBlue: '#BDECEC',

  			vibrantOrange: '#FF9E0F',
  			lightBlueGray: '#F8F9FB',
  			customGray: '#515869',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			  'slate-custom': '#515869',
			  charcoal: '#393939',  
			  lightGrayBlue: '#E8EAEE', 
			  lightGrayBlue2: '#E0E0E2',  
			  turquoise: '#36BABB', 
			  'soft-red': '#EE787D', 

			  emeraldGreen: '#67D27E',
			  CloudGray : "#A3A3A3",




  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'27': '107px',
			'19' : '76px',
  		},
  		fontFamily: {
  			vazirmatn: [
  				'Vazirmatn FD'
  			]
  		},
		  boxShadow: {
			'top': '0px -4px 6px rgba(0, 0, 0, 0.1)',
		  },
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1300px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		
  	}
  },
  plugins: [require("tailwindcss-animate"),heroui()],
} satisfies Config;

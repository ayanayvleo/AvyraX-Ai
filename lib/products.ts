export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
  popular?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small teams getting started with AI marketing",
    priceInCents: 2900, // $29/month
    features: [
      "Up to 5 AI agents",
      "50 content pieces per month",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses that need advanced AI capabilities",
    priceInCents: 9900, // $99/month
    features: [
      "Up to 20 AI agents",
      "Unlimited content",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "API access",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations with specific needs",
    priceInCents: 29900, // $299/month
    features: [
      "Unlimited AI agents",
      "Unlimited content",
      "Enterprise analytics",
      "Dedicated support",
      "Custom integrations",
      "Advanced API access",
      "White-label options",
      "SLA guarantee",
    ],
  },
]

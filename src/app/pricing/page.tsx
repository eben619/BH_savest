'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { CreditCard, Calendar, AlertCircle, Download, Gift, Users, Check, Copy, Share2, Twitter, Facebook, Linkedin, ChevronDown, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { Switch } from "@/app/components/ui/switch";
import { MagicCard } from "@/app/components/ui/magic-card";
import ShimmerButton from "@/app/components/ui/shimmer-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import * as ethers from 'ethers';
import { toast } from 'react-hot-toast';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import 'react-circular-progressbar/dist/styles.css';
import AnimatedCircularProgressBar from "@/app/components/ui/animated-circular-progress-bar";

const planData = [
  {
    name: 'Basic',
    description: 'Perfect for users looking to dip their toes into savings and investments with simple tools and automation.',
    features: [
      'Core Savings & Investment Tools',
      'Automated Savings',
      'Goal Tracking (up to 3 goals)',
      'Basic Analytics',
      'Basic Support (24-48 hour response time)',
      'Mobile Access'
    ]
  },
  {
    name: 'Pro',
    description: 'Ideal for users who are ready to make more informed financial decisions and actively grow their wealth through advanced tools and insights.',
    features: [
      'Advanced Investment Options',
      'Automated Portfolio Rebalancing',
      'Staking & Passive Income',
      'Custom Savings Goals',
      'In-Depth Analytics & Reports',
      'Priority Support',
      'Exclusive Webinars & Tutorials'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Designed for high-net-worth individuals or businesses looking for comprehensive financial management solutions.',
    features: [
      'Full Investment Suite',
      'Dedicated Financial Advisor',
      'Custom Portfolio Strategies',
      'Enhanced Staking & Yield Farming',
      'Team Management (Business Accounts)',
      'Enterprise-Level Analytics',
      'White-Glove Support',
      'Custom Integrations & API Access'
    ]
  }
];

const faqData = [
  {
    question: "What's the difference between saving and investing?",
    answer: "Saving typically involves putting money aside in a low-risk account for short-term goals or emergencies. Investing means putting money into assets like stocks or bonds with the aim of growing wealth over a longer period, but it comes with more risk."
  },
  {
    question: "How much should I save each month?",
    answer: "A common rule of thumb is to save 20% of your income, but this can vary based on your financial goals and situation. Start with what you can afford and gradually increase your savings rate."
  },
  {
    question: "What's the best way to start investing with little money?",
    answer: "You can start with low-cost index funds or ETFs, which offer diversification at a low entry point. Many platforms also offer fractional shares, allowing you to invest in expensive stocks with small amounts."
  },
  {
    question: "How do I create a diversified investment portfolio?",
    answer: "A diversified portfolio typically includes a mix of stocks, bonds, and other assets across various sectors and geographical regions. The exact mix depends on your risk tolerance and investment goals."
  },
  {
    question: "What are the tax implications of saving and investing?",
    answer: "Interest from savings accounts is typically taxable as income. For investments, you may owe capital gains tax on profits. However, certain accounts like 401(k)s or IRAs offer tax advantages for retirement savings."
  },
  {
    question: "How often should I review my investments?",
    answer: "It's good to review your investments at least annually or when there are significant life changes. However, avoid making frequent changes based on short-term market fluctuations."
  },
  {
    question: "What's the difference between active and passive investing?",
    answer: "Active investing involves trying to beat the market through frequent trading and in-depth analysis. Passive investing aims to match market performance, typically through index funds, and usually involves less frequent trading and lower fees."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <p className="text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for users looking to dip their toes into savings and investments with simple tools and automation.',
    features: [
      'Core Savings & Investment Tools',
      'Automated Savings',
      'Goal Tracking (up to 3 goals)',
      'Basic Analytics',
      'Basic Support (24-48 hour response time)',
      'Mobile Access'
    ],
    cta: 'Try for Free',
  },
  {
    name: 'Premium', // Changed from 'Pro' to 'Premium'
    price: 3, // Changed from 29.99 to 3
    description: 'Ideal for users who are ready to make more informed financial decisions and actively grow their wealth through advanced tools and insights.',
    features: [
      'Advanced Investment Options',
      'Automated Portfolio Rebalancing',
      'Staking & Passive Income',
      'Custom Savings Goals',
      'In-Depth Analytics & Reports',
      'Priority Support',
      'Exclusive Webinars & Tutorials'
    ],
    cta: 'Subscribe',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 7, // Changed from 99.99 to 7
    description: 'Designed for high-net-worth individuals or businesses looking for comprehensive financial management solutions.',
    features: [
      'Full Investment Suite',
      'Dedicated Financial Advisor',
      'Custom Portfolio Strategies',
      'Enhanced Staking & Yield Farming',
      'Team Management (Business Accounts)',
      'Enterprise-Level Analytics',
      'White-Glove Support',
      'Custom Integrations & API Access'
    ],
    cta: 'Contact Sales',
  },
];

export function StakingRewardCalculator() {
  const [protocol, setProtocol] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState('');
  const [rewardRate, setRewardRate] = useState('');
  const [rewardsEarned, setRewardsEarned] = useState({ usd: 0, tokens: 0 });
  const [chartData, setChartData] = useState([]);

  const topTokens = [
    { value: 'ETH', label: 'Ethereum' },
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'SOL', label: 'Solana' },
    { value: 'DOT', label: 'Polkadot' },
    { value: 'ADA', label: 'Cardano' },
    { value: 'AVAX', label: 'Avalanche' },
    { value: 'MATIC', label: 'Polygon' },
    { value: 'LUNA', label: 'Terra' },
    { value: 'NEAR', label: 'NEAR Protocol' },
    { value: 'ALGO', label: 'Algorand' },
  ];

  const stakingDurations = [
    { value: 1, label: '1 Week' },
    { value: 2, label: '2 Weeks' },
    { value: 4, label: '4 Weeks' },
    { value: 8, label: '8 Weeks' },
    { value: 12, label: '12 Weeks' },
    { value: 24, label: '24 Weeks' },
    { value: 52, label: '52 Weeks' },
  ];

  const calculateRewards = () => {
    // Calculate rewards earned and update chart data
  };

  const formatYAxis = (value: number) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Week ${label}`}</p>
          <p className="intro">{`Total Balance: $${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
          <p className="intro">{`Rewards: $${payload[1].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <MagicCard 
      className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-2 overflow-y-auto max-h-[80vh]"
      gradientColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          {[
            { title: "Enter Protocol", value: protocol, onChange: setProtocol, options: topTokens },
            { title: "Amount of Tokens", value: amount, onChange: setAmount, suffix: protocol },
            { title: "Staking Duration", value: duration.toString(), onChange: (value) => setDuration(Number(value)), options: stakingDurations },
            { title: "Price", value: price, onChange: setPrice, suffix: "USD" },
            { title: "Staking Rewards Rate", value: rewardRate, onChange: setRewardRate, suffix: "%" }
          ].map((item, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="p-2">
                <CardTitle className="text-white text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {item.options ? (
                  <Select value={item.value} onValueChange={item.onChange}>
                    <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder={`Select ${item.title.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <Input
                      type="text"
                      value={item.value}
                      onChange={(e) => item.onChange(e.target.value)}
                      className="text-white bg-white/20 border-white/30 pr-12"
                    />
                    {item.suffix && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-semibold text-white">Rewards Earned</CardTitle>
              <p className="text-xs text-gray-300">Estimated earnings over {duration} weeks</p>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                <div>
                  <p className="text-xs text-gray-300">In USD</p>
                  <p className="text-lg font-bold text-green-400">
                    ${rewardsEarned.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-300">In {protocol}</p>
                  <p className="text-sm font-semibold text-purple-300">
                    {rewardsEarned.tokens.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {protocol}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="p-2">
              <CardTitle className="text-white text-sm">Rewards Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={chartData} 
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="week" 
                      stroke="white"
                      tick={{fontSize: 10}}
                    />
                    <YAxis 
                      stroke="white"
                      tickFormatter={formatYAxis}
                      tick={{fontSize: 10}}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      name="Total Balance" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reward" 
                      name="Rewards" 
                      stroke="#34D399" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MagicCard>
  );
}

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState('credit_card');
  const [isAnnual, setIsAnnual] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const referralLink = `https://blockholder.com/?ref=${user?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const message = 'Check out BlockHolder - the ultimate platform for managing your crypto assets!';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent(message)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  // Mock data for the billing dashboard
  const billingData = {
    currentPlan: "Premium", // Changed from "Pro" to "Premium"
    billingCycle: "Monthly",
    nextBillingDate: "2023-06-15",
    cost: 3, // Changed from 29.99 to 3
    status: "Active",
    features: [
      "Advanced Investment Options",
      "Automated Portfolio Rebalancing",
      "Staking & Passive Income",
      "Unlimited Custom Savings Goals",
      "In-Depth Analytics & Reports",
      "Priority Support",
    ],
    usageLimits: {
      transactions: { used: 150, limit: 500 },
      portfolios: { used: 3, limit: 10 },
    },
    paymentMethods: [
      { type: "Credit Card", last4: "1234", expiry: "12/24" },
    ],
    transactions: [
      { date: "2023-05-15", amount: 29.99, method: "Credit Card (*1234)" },
      { date: "2023-04-15", amount: 29.99, method: "Credit Card (*1234)" },
    ],
    referrals: { count: 3, earnings: 45 },
  };

  const handleAddPaymentMethod = () => {
    // Here you would typically integrate with a payment processor
    console.log(`Adding new payment method: ${newPaymentMethod}`);
    setIsAddPaymentOpen(false);
    // You might want to update the billingData state here to reflect the new payment method
  };

  const handleUpgrade = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Define the upgrade costs (in ETH)
        const upgradeCosts = {
          basic: '0',
          premium: '0.01',
          enterprise: '0.05'
        };

        // Get the cost for the selected plan
        const cost = upgradeCosts[selectedPlan];

        // Create a transaction object
        const transaction = {
          to: '0xYourContractAddressHere', // Replace with your actual contract address
          value: ethers.utils.parseEther(cost)
        };

        // Show a loading toast
        const loadingToast = toast.loading('Confirming transaction...');

        // Send the transaction
        const tx = await signer.sendTransaction(transaction);
        
        // Wait for the transaction to be mined
        await tx.wait();

        // Close the loading toast and show a success message
        toast.dismiss(loadingToast);
        toast.success(`Successfully upgraded to ${selectedPlan} plan!`);

        console.log(`Upgraded to ${selectedPlan} plan. Transaction hash: ${tx.hash}`);
        
        // Close the upgrade modal
        setIsUpgradeModalOpen(false);
        
        // You might want to update the user's plan in your backend here
      } catch (error) {
        console.error('Error upgrading plan:', error);
        toast.error('Failed to upgrade plan. Please try again.');
        
        // Close the upgrade modal even if there's an error
        setIsUpgradeModalOpen(false);
      }
    } else {
      console.error('Ethereum wallet is not connected');
      toast.error('Ethereum wallet is not connected. Please connect your wallet and try again.');
      
      // Close the upgrade modal if the wallet is not connected
      setIsUpgradeModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        {isSignedIn ? (
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WordPullUp 
              words="Your Billing Dashboard"
              className="text-5xl font-bold mb-6 text-center text-gray-800"
            />
            <p className="text-xl mb-12 text-center text-gray-600">Manage your subscription and billing information, {user.firstName}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Plan Overview Card */}
              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <Sparkles className="mr-2 text-yellow-600" /> Current Plan Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-3xl font-bold text-purple-600 mb-4">{billingData.currentPlan} Plan</p>
                  <div className="space-y-2 text-gray-700">
                    <p>Billing Cycle: <span className="font-semibold">{billingData.billingCycle}</span></p>
                    <p>Next Billing Date: <span className="font-semibold">{billingData.nextBillingDate}</span></p>
                    <p>Cost: <span className="font-semibold">${billingData.cost} per {billingData.billingCycle.toLowerCase()}</span></p>
                    <p className="text-green-600 font-semibold">Status: {billingData.status}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
                    <DialogTrigger asChild>
                      <ShimmerButton
                        className="w-full text-white font-semibold py-2 text-lg"
                        background="linear-gradient(to right, #8B5CF6, #D946EF)"
                        shimmerColor="rgba(255, 255, 255, 0.2)"
                      >
                        Upgrade Plan
                      </ShimmerButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-transparent border-none shadow-none">
                      <MagicCard 
                        className="overflow-hidden backdrop-blur-lg bg-white/10 text-white"
                        gradientColor="rgba(139, 92, 246, 0.3)"
                      >
                        <CardHeader className="p-6">
                          <CardTitle className="text-2xl font-bold text-center">Upgrade Your Plan</CardTitle>
                          <CardDescription className="text-center text-purple-200">
                            Choose a plan that best fits your needs.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                            {[
                              { value: "basic", label: "Basic Plan", price: "Free" },
                              { value: "premium", label: "Premium Plan", price: "$3/month" },
                              { value: "enterprise", label: "Enterprise Plan", price: "$7/month" }
                            ].map((plan) => (
                              <div key={plan.value} className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg transition-all duration-200 hover:bg-white/10">
                                <RadioGroupItem value={plan.value} id={plan.value} className="border-purple-400 text-purple-400" />
                                <Label htmlFor={plan.value} className="flex-grow font-semibold">{plan.label}</Label>
                                <span className="text-purple-300">{plan.price}</span>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                        <CardFooter className="p-6">
                          <ShimmerButton
                            onClick={handleUpgrade}
                            className="w-full text-white font-semibold py-2 text-lg"
                            background="linear-gradient(to right, #8B5CF6, #D946EF)"
                            shimmerColor="rgba(255, 255, 255, 0.2)"
                          >
                            Confirm Upgrade
                          </ShimmerButton>
                        </CardFooter>
                      </MagicCard>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </MagicCard>

              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <AlertCircle className="mr-2" /> Usage Limits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700">
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(billingData.usageLimits).map(([key, value]) => (
                      <TooltipProvider key={key}>
                        <UITooltip>
                          <TooltipTrigger>
                            <div className="flex flex-col items-center">
                              <AnimatedCircularProgressBar
                                max={value.limit}
                                value={value.used}
                                min={0}
                                gaugePrimaryColor="rgba(139, 92, 246, 0.8)"
                                gaugeSecondaryColor="rgba(255, 255, 255, 0.2)"
                                className="mb-4"
                              />
                              <p className="font-semibold capitalize mb-2">{key}</p>
                              <p className="text-sm">
                                {value.used} / {value.limit} used
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{`${value.limit - value.used} ${key} remaining`}</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <ShimmerButton
                    className="w-full text-white font-semibold py-2 text-lg"
                    background="linear-gradient(to right, #8B5CF6, #D946EF)"
                    shimmerColor="rgba(255, 255, 255, 0.2)"
                  >
                    Upgrade for Higher Limits
                  </ShimmerButton>
                </CardFooter>
              </MagicCard>

              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <Calendar className="mr-2" /> Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700">
                  {billingData.transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span>{transaction.date}</span>
                      <span>${transaction.amount}</span>
                      <span>{transaction.method}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="p-6">
                  <Button variant="outline" className="w-full">View All Transactions</Button>
                </CardFooter>
              </MagicCard>

              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <CreditCard className="mr-2" /> Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700">
                  {billingData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span>{method.type} ending in {method.last4}</span>
                      <span>Expires {method.expiry}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="p-6">
                  <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-purple-900 hover:bg-purple-800 text-white">
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-300">Add New Payment Method</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Choose a new payment method to add to your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <RadioGroup value={newPaymentMethod} onValueChange={setNewPaymentMethod}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit_card" id="credit_card" />
                            <Label htmlFor="credit_card" className="text-white">Credit/Debit Card</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="text-white">PayPal</Label>
                          </div>
                        </RadioGroup>
                        {newPaymentMethod === 'credit_card' && (
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Card Number" className="col-span-2 bg-gray-700 text-white placeholder-gray-400" />
                            <Input placeholder="MM/YY" className="bg-gray-700 text-white placeholder-gray-400" />
                            <Input placeholder="CVC" className="bg-gray-700 text-white placeholder-gray-400" />
                            <Input placeholder="Cardholder Name" className="col-span-2 bg-gray-700 text-white placeholder-gray-400" />
                          </div>
                        )}
                        {newPaymentMethod === 'paypal' && (
                          <Button onClick={() => window.open('https://www.paypal.com', '_blank')} className="bg-blue-500 hover:bg-blue-600 text-white">
                            Connect PayPal Account
                          </Button>
                        )}
                      </div>
                      <DialogFooter>
                        <ShimmerButton
                          onClick={handleAddPaymentMethod}
                          className="w-full text-white font-semibold py-2 text-lg"
                          background="linear-gradient(to right, #8B5CF6, #D946EF)"
                          shimmerColor="rgba(255, 255, 255, 0.2)"
                        >
                          Add Payment Method
                        </ShimmerButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </MagicCard>

              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <Gift className="mr-2" /> Promotional Discounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700">
                  <p>Enter a promo code to apply a discount to your next bill.</p>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full px-3 py-2 border rounded mt-2"
                  />
                </CardContent>
                <CardFooter className="p-6">
                  <Button className="w-full bg-purple-900 hover:bg-purple-800 text-white">Apply Promo Code</Button>
                </CardFooter>
              </MagicCard>

              <MagicCard 
                className="overflow-hidden backdrop-blur-lg bg-gray-100"
                gradientColor="rgba(139, 92, 246, 0.1)"
              >
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-2xl text-gray-800">
                    <Users className="mr-2" /> Referral Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700">
                  <p className="text-2xl font-bold mb-2">Earn Rewards</p>
                  <p className="mb-4">Share BlockHolder and earn rewards for each referral.</p>
                  <div className="space-y-2">
                    <p>Users Referred: <span className="font-semibold">{billingData.referrals.count}</span></p>
                    <p>Total Earnings: <span className="font-semibold">${billingData.referrals.earnings}</span></p>
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <Dialog open={isReferralModalOpen} onOpenChange={setIsReferralModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-purple-900 hover:bg-purple-800 text-white">
                        Share Referral Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-300">Share Your Referral Link</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Copy your unique referral link or share it directly on social media.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2">
                          <Input value={referralLink} readOnly className="bg-gray-700 text-white" />
                          <Button onClick={handleCopyLink} size="icon" className="bg-purple-600 hover:bg-purple-700">
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button onClick={() => handleShare('twitter')} variant="outline" className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white">
                            <Twitter className="h-4 w-4" />
                            Twitter
                          </Button>
                          <Button onClick={() => handleShare('facebook')} variant="outline" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </Button>
                          <Button onClick={() => handleShare('linkedin')} variant="outline" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsReferralModalOpen(false)} className="bg-gray-600 hover:bg-gray-700 text-white">
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </MagicCard>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="mr-4 bg-red-100 text-red-600 hover:bg-red-200">Cancel Subscription</Button>
              <Button variant="outline" className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200">Pause Subscription</Button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordPullUp 
                words="Choose the Right Plan for You"
                className="text-5xl font-bold mb-6 text-gray-800"
              />
              <p className="text-xl mb-8 text-gray-600">Unlock premium features and take control of your financial future.</p>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto max-w-2xl text-center lg:max-w-4xl mb-8">
                <h2 className="text-base font-semibold leading-7 text-purple-600">Pricing</h2>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                  Simple pricing for everyone.
                </p>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                  Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving financial growth.
                </p>
              </div>

              <div className="mt-8 flex justify-center items-center space-x-4">
                <span className={`text-sm ${!isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <span className={`text-sm ${isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Annual</span>
                {isAnnual && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    2 MONTHS FREE
                  </span>
                )}
              </div>

              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {tiers.map((tier) => (
                  <MagicCard 
                    key={tier.name} 
                    className={`flex flex-col ${tier.highlighted ? 'border-primary shadow-lg' : ''}`}
                    gradientColor="rgba(124, 58, 237, 0.2)" // Purple color with low opacity
                  >
                    <div className="flex flex-col h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">{tier.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{tier.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-3xl font-bold mb-6">
                          {tier.price === 'Free' ? 'Free' : (
                            <>
                              ${isAnnual ? (tier.price as number) * 10 : tier.price}
                              <span className="text-base font-normal text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                            </>
                          )}
                        </p>
                        <ul className="space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm">
                              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <ShimmerButton
                          className="w-full text-white"
                          background="linear-gradient(to bottom right, #4c1d95, #5b21b6)" // Dark purple gradient
                          shimmerColor="rgba(255, 255, 255, 0.2)"
                        >
                          {tier.cta}
                        </ShimmerButton>
                      </CardFooter>
                    </div>
                  </MagicCard>
                ))}
              </div>
            </motion.section>

            {/* Page break */}
            <div className="w-full border-t border-gray-200 my-16"></div>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold mb-2 text-center text-gray-800">FAQ</h2>
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-700">Frequently Asked Questions</h3>
              <div className="max-w-3xl mx-auto">
                {faqData.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
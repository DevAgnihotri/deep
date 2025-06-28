import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
	Heart, 
	Star, 
	Brain, 
	Calendar, 
	TrendingUp, 
	Users, 
	Award, 
	Clock,
	Shield,
	ArrowRight,
	CheckCircle,
	Zap,
	Baby,
	HeartHandshake,
	Stethoscope,
	Globe,
	Target,
	Sparkles,
	Phone,
	MessageCircle,
	BookOpen,
	UserCheck,
	Lightbulb,
	type LucideIcon
} from "lucide-react";

// Import interactive charts
import {
	MentalHealthCrisisChart,
	SilentStruggleChart,
	RiskComparisonChart,
	SeveritySpectrumChart,
	EarlyWarningChart
} from "../components/charts";

// Women's Mental Health Crisis Statistics
const crisisStats = [
	{ 
		number: "970M+", 
		text: "People worldwide struggle with mental health challenges",
		icon: Globe,
		color: "from-rose-400 to-pink-500",
		description: "Mental health crisis affects nearly 1 billion people globally"
	},
	{ 
		number: "2x", 
		text: "Women are twice as likely to experience depression",
		icon: Heart,
		color: "from-purple-400 to-violet-500",
		description: "Women face unique mental health challenges requiring specialized care"
	},
	{ 
		number: "75%", 
		text: "Of women don't receive adequate mental health support",
		icon: Stethoscope,
		color: "from-blue-400 to-cyan-500",
		description: "Critical treatment gap leaves women without proper care"
	},
	{ 
		number: "1 in 3", 
		text: "Women experience anxiety disorders in their lifetime",
		icon: TrendingUp,
		color: "from-amber-400 to-orange-500",
		description: "Anxiety affects millions of women across all life stages"
	},
];

// Comprehensive Women's Mental Health Solutions
const solutions = [
	{
		title: "Specialized Women's Care",
		desc: "Evidence-based treatment for depression, anxiety, trauma, and women's unique mental health challenges by certified specialists.",
		icon: Heart,
		gradient: "from-rose-400 to-pink-500",
		features: ["Depression Treatment", "Anxiety Support", "Trauma Recovery", "Life Transition Support"]
	},
	{
		title: "24/7 Support",
		desc: "Immediate help when you need it most. Specialized women's mental health crisis intervention available around the clock.",
		icon: Shield,
		gradient: "from-purple-400 to-violet-500",
		features: ["Instant Crisis Response", "Women's Emergency Support", "24/7 Helpline", "Immediate Intervention"]
	},
	{
		title: "AI-Powered Personalization",
		desc: "Advanced technology creates individualized treatment plans tailored specifically for women's mental health needs across all life stages.",
		icon: Brain,
		gradient: "from-blue-400 to-cyan-500",
		features: ["Personalized Treatment Plans", "AI Assessment Tools", "Progress Tracking", "Adaptive Care Paths"]
	},
	{
		title: "Women's Health Specialist Network",
		desc: "Connect with board-certified therapists who specialize in women's mental health, including reproductive health, career stress, and relationship challenges.",
		icon: HeartHandshake,
		gradient: "from-green-400 to-emerald-500",
		features: ["Women's Health Therapists", "Female Mental Health Experts", "Specialized Training", "Evidence-Based Approaches"]
	},
];

// Powerful Impact Metrics
const impactMetrics = [
	{ icon: Users, label: "Women Helped", value: "2,500+", color: "text-rose-600", bgColor: "bg-rose-50" },
	{ icon: Heart, label: "Recovery Success", value: "94%", color: "text-purple-600", bgColor: "bg-purple-50" },
	{ icon: Award, label: "Specialist Therapists", value: "150+", color: "text-blue-600", bgColor: "bg-blue-50" },
	{ icon: Clock, label: "Crisis Response", value: "24/7", color: "text-green-600", bgColor: "bg-green-50" },
	{ icon: Shield, label: "Privacy Protected", value: "100%", color: "text-indigo-600", bgColor: "bg-indigo-50" },
	{ icon: Sparkles, label: "Treatment Plans", value: "Custom", color: "text-amber-600", bgColor: "bg-amber-50" },
];

// Comprehensive Benefits
const platformBenefits = [
	"WOMEN'S MENTAL HEALTH SPECIALISTS",
	"DEPRESSION & ANXIETY TREATMENT", 
	"TRAUMA-INFORMED CARE",
	"24/7 CRISIS INTERVENTION",
	"REPRODUCTIVE HEALTH SUPPORT",
	"AI-POWERED PERSONALIZATION",
	"HIPAA COMPLIANT SECURITY",
	"FLEXIBLE SCHEDULING",
	"INSURANCE ACCEPTED",
	"EVIDENCE-BASED THERAPY",
	"LIFE TRANSITION SUPPORT",
	"RELATIONSHIP COUNSELING",
	"CAREER STRESS MANAGEMENT",
	"COMMUNITY CONNECTIONS"
];

const testimonials = [
	{
		name: "Sarah Martinez",
		text: "Mindhaven changed my life during my struggle with depression and anxiety. The specialized women's care and understanding I received was exactly what I needed. I finally felt heard and supported.",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "Working Professional",
		location: "California"
	},
	{
		name: "Dr. Emily Chen",
		text: "As a licensed psychologist specializing in women's mental health, I'm incredibly impressed by Mindhaven's evidence-based approach. This platform truly addresses the critical treatment gap in women's mental health care.",
		avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "Clinical Psychologist",
		location: "New York"
	},
	{
		name: "Maria Rodriguez",
		text: "The community support and specialized therapy helped me through career burnout and relationship stress. The 24/7 support gave me peace of mind knowing help was always available when I needed it most.",
		avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "Entrepreneur",
		location: "Texas"
	},
];

// How It Works Process
const processSteps = [
	{
		step: "01",
		title: "Take Assessment",
		description: "Complete our specialized women's mental health screening designed by licensed professionals",
		icon: CheckCircle,
		color: "from-rose-400 to-pink-500"
	},
	{
		step: "02", 
		title: "Get Matched",
		description: "Our AI connects you with certified women's mental health specialists who understand your specific needs",
		icon: UserCheck,
		color: "from-purple-400 to-violet-500"
	},
	{
		step: "03",
		title: "Start Healing",
		description: "Begin your personalized treatment plan with evidence-based therapy and ongoing support",
		icon: Lightbulb,
		color: "from-blue-400 to-cyan-500"
	}
];

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};

const floatingVariants = {
	animate: {
		y: [-5, 5, -5],
		transition: {
			duration: 3,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

// Marquee Component with true infinite scroll
const Marquee = ({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) => (
	<div className="overflow-hidden whitespace-nowrap w-full">
		<motion.div
			className="inline-flex w-max"
			animate={{ x: [0, "-50%"] }}
			transition={{
				duration: speed,
				repeat: Infinity,
				ease: "linear",
			}}
		>
			<div className="flex items-center">
				{children}
			</div>
			<div className="flex items-center">
				{children}
			</div>
		</motion.div>
	</div>
);

// Enhanced Animated Landing Page
const Landing = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"]
	});

	const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
	const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

	return (
		<div ref={containerRef} className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 relative overflow-hidden">
			{/* Crisis Awareness Banner */}
			<div className="w-full bg-gradient-to-r from-rose-500/95 to-purple-600/95 py-3 overflow-hidden shadow-lg relative">
				<motion.div 
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
					animate={{ x: ["-100%", "100%"] }}
					transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
				/>
				<Marquee speed={25}>
					<div className="flex items-center text-white text-sm font-medium tracking-wide">
						{platformBenefits.map((benefit, index) => (
							<span key={index} className="whitespace-nowrap px-4 flex items-center">
								<Sparkles className="w-3 h-3 mr-2" />
								{benefit}
							</span>
						))}
					</div>
				</Marquee>
			</div>

			{/* Parallax Background with Logo */}
			<motion.div 
				className="absolute inset-0 overflow-hidden z-0"
				style={{ y: parallaxY, scale: parallaxScale, opacity: parallaxOpacity }}
			>
				{/* Front Logo as Background Element */}
				<motion.div 
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					animate={{ 
						rotate: [0, 360],
						scale: [0.8, 1, 0.8]
					}}
					transition={{ 
						duration: 20, 
						repeat: Infinity, 
						ease: "linear" 
					}}
				>					<img 
						src="/front_logo.png" 
						alt="Mindhaven Logo" 
						className="w-96 h-96 object-contain opacity-5 drop-shadow-2xl"
					/>
				</motion.div>
				
				{/* Animated Background Shapes */}
				<motion.div
					className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-rose-200/20 to-pink-300/20 rounded-full blur-xl"
					animate={{ rotate: 360, scale: [1, 1.2, 1] }}
					transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-blue-300/20 rounded-full blur-xl"
					animate={{ rotate: -360, scale: [1, 1.3, 1] }}
					transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-r from-blue-200/15 to-cyan-300/15 rounded-full blur-xl"
					animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				/>
			</motion.div>

			{/* Header */}
			<motion.header 
				className="relative z-20 w-full flex justify-between items-center px-8 py-6 bg-white/10 backdrop-blur-sm"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}
			>
				<motion.div 
					className="flex items-center space-x-4"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<motion.img 
						src="/front_logo.png"						alt="Mindhaven Logo" 
						className="w-14 h-14 object-contain drop-shadow-lg"
						animate={{ rotate: [0, 5, -5, 0] }}
						transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
					/>
					<div>
						<motion.h1 
							className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide"
							animate={{ backgroundPosition: ["0%", "100%"] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						>
							Mindhaven
						</motion.h1>
						<p className="text-sm text-gray-700 font-medium tracking-wide">Women's Mental Health Platform</p>
					</div>
				</motion.div>
						
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="hidden sm:block"
				>
					<Link
						to="/login"
						className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-rose-600 hover:to-purple-700 border border-white/20 backdrop-blur-sm"
					>
						Get Help Now
					</Link>
				</motion.div>
			</motion.header>

			{/* Hero Section */}
			<motion.section 
				className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-20"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Crisis Call-out */}
				<motion.div 
					className="mb-8 px-6 py-3 bg-gradient-to-r from-rose-100 to-purple-100 border border-rose-200 rounded-full"
					variants={itemVariants}
				>					<p className="text-rose-700 font-semibold text-sm flex items-center gap-2">
						<Heart className="w-4 h-4 animate-pulse" />
						Empowering women's mental health journey - You are not alone
					</p>
				</motion.div>

				<motion.h1 
					className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
					variants={itemVariants}
					animate={{ 
						backgroundPosition: ["0%", "100%", "0%"],
						scale: [1, 1.02, 1]
					}}
					transition={{ 
						backgroundPosition: { duration: 4, repeat: Infinity },
						scale: { duration: 6, repeat: Infinity }
					}}				>
					Mindhaven
				</motion.h1>
				
				<motion.p 
					className="text-2xl md:text-4xl text-gray-800 mb-6 max-w-5xl mx-auto leading-relaxed font-light"
					variants={itemVariants}
				>
					Breaking barriers in <span className="font-semibold text-rose-600">women's mental health</span>
				</motion.p>
				
				<motion.p 
					className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
					variants={itemVariants}
				>					Comprehensive care for depression, anxiety, trauma, and women's unique mental health challenges. 
					Evidence-based treatment with certified women's mental health specialists available 24/7.
				</motion.p>

				{/* Crisis Statistics */}
				<motion.div 
					className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto"
					variants={containerVariants}
				>
					{crisisStats.map((stat, index) => (
						<motion.div
							key={stat.text}
							className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
							variants={itemVariants}
							whileHover={{ 
								scale: 1.05,
								y: -5,
								boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
							}}
							transition={{ delay: index * 0.1 }}
						>
							<motion.div 
								className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
								animate={{ rotate: [0, 5, -5, 0] }}
								transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
							>
								<stat.icon className="w-8 h-8 text-white" />
							</motion.div>
							<h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.number}</h3>
							<p className="text-sm text-gray-600 leading-tight">{stat.text}</p>
						</motion.div>
					))}
				</motion.div>

				{/* Main CTA */}
				<motion.div
					className="flex flex-col sm:flex-row gap-4 mb-20"
					variants={itemVariants}
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to="/signup"
							className="inline-block px-12 py-5 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 text-white rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group border border-white/20"
						>
							<span className="relative z-20 flex items-center gap-3">
								Start Your Journey
								<ArrowRight className="w-5 h-5" />
							</span>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
							/>
						</Link>
					</motion.div>
							<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to="/login"
							className="inline-block px-12 py-5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-white"
						>
							<span className="flex items-center gap-3">
								<Phone className="w-5 h-5" />
								Support
							</span>
						</Link>
					</motion.div>				</motion.div>
			</motion.section>

			{/* Mental Health Crisis Reality Chart */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-4xl font-bold mb-4 text-gray-800">
							The Reality We Face
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Understanding the scope of the women's mental health crisis through real data
						</p>
					</motion.div>
					
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<MentalHealthCrisisChart />
						</div>						<div className="space-y-6">
							<motion.div 
								className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
								variants={itemVariants}
							>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">
									The Shocking Truth
								</h3>
								<p className="text-gray-600 leading-relaxed mb-4">
									Our comprehensive analysis of over 16,000 women reveals that 
									<span className="font-bold text-rose-600"> 81.3% struggle with depression symptoms</span>, 
									with nearly 40% requiring immediate intervention.
								</p>
								<p className="text-gray-600 leading-relaxed mb-4">
									This isn't just statistics—it's mothers, daughters, and families who need our support.
								</p>
								
								{/* Key Statistics */}
								<div className="grid grid-cols-2 gap-4 mt-4">
									<div className="bg-rose-50 rounded-xl p-4 text-center">
										<p className="text-2xl font-bold text-rose-600">13,132</p>
										<p className="text-sm text-gray-600">Women with symptoms</p>
									</div>
									<div className="bg-red-50 rounded-xl p-4 text-center">
										<p className="text-2xl font-bold text-red-600">6,418</p>
										<p className="text-sm text-gray-600">Critical cases</p>
									</div>
								</div>
							</motion.div>
							
							<motion.div 
								className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-6"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-gray-800 mb-3">
									Why This Matters
								</h4>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Early identification prevents crisis situations</span>
											<p className="text-sm text-gray-500 mt-1">Detecting symptoms early can prevent 70% of severe cases</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Professional support dramatically improves outcomes</span>
											<p className="text-sm text-gray-500 mt-1">94% recovery rate with proper treatment</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Every woman deserves access to mental health care</span>
											<p className="text-sm text-gray-500 mt-1">Only 15% currently receive adequate treatment</p>
										</div>
									</li>
								</ul>
							</motion.div>
							
							<motion.div 
								className="bg-blue-50 rounded-2xl p-6"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-gray-800 mb-3">
									The Hidden Impact
								</h4>
								<div className="space-y-3 text-gray-600 text-sm">
									<div className="flex justify-between items-center">
										<span>Postpartum Depression Rate:</span>
										<span className="font-bold text-blue-600">1 in 7 mothers</span>
									</div>
									<div className="flex justify-between items-center">
										<span>Average Cost per Untreated Case:</span>
										<span className="font-bold text-orange-600">$32,000</span>
									</div>
									<div className="flex justify-between items-center">
										<span>Women Receiving Treatment:</span>
										<span className="font-bold text-red-600">Only 15%</span>
									</div>
									<div className="flex justify-between items-center">
										<span>Global Mental Health Crisis:</span>
										<span className="font-bold text-purple-600">970M+ people</span>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Solutions Section */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-7xl mx-auto">
					<motion.div className="text-center mb-16" variants={itemVariants}>						<h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
							Comprehensive Women's Care
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive solutions designed specifically for women's mental health challenges
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12">
						{solutions.map((solution, index) => (
							<motion.div
								key={solution.title}
								className="relative group"
								variants={itemVariants}
								whileHover={{ y: -8 }}
								transition={{ delay: index * 0.2 }}
							>
								<div className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300`} />
								<div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
									<motion.div 
										className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${solution.gradient} flex items-center justify-center`}
										animate={{ rotate: [0, 5, -5, 0] }}
										transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
									>
										<solution.icon className="w-10 h-10 text-white" />
									</motion.div>
									<h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
										{solution.title}
									</h3>
									<p className="text-gray-600 mb-6 leading-relaxed text-center">
										{solution.desc}
									</p>
									<div className="space-y-3">
										{solution.features.map((feature, featureIndex) => (
											<motion.div 
												key={feature}
												className="flex items-center gap-3 text-sm text-gray-700"
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
											>
												<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
												{feature}
											</motion.div>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>				</div>
			</motion.section>

			{/* Silent Struggle Analysis */}
			<motion.section 
				className="relative z-10 py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-4xl font-bold mb-4 text-gray-800">
							Breaking Down the Silent Struggle
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Making complex mental health data accessible and actionable
						</p>
					</motion.div>
					
					<SilentStruggleChart />
					
					<motion.div 
						className="mt-12 text-center"
						variants={itemVariants}
					>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								Understanding the Zones
							</h3>
							<div className="grid md:grid-cols-3 gap-6 text-left">
								<div className="text-center">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<Shield className="w-8 h-8 text-green-600" />
									</div>
									<h4 className="font-bold text-green-700 mb-2">Safe Zone</h4>
									<p className="text-sm text-gray-600">
										Women with stable mental health who can maintain wellness with preventive care
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<Target className="w-8 h-8 text-yellow-600" />
									</div>
									<h4 className="font-bold text-yellow-700 mb-2">Warning Zone</h4>
									<p className="text-sm text-gray-600">
										Early intervention can prevent progression to more severe mental health issues
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<Heart className="w-8 h-8 text-red-600" />
									</div>
									<h4 className="font-bold text-red-700 mb-2">Crisis Zone</h4>
									<p className="text-sm text-gray-600">
										Immediate professional support is essential to prevent crisis situations
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* How It Works Section */}
			<motion.section 
				className="relative z-10 py-20 px-4 bg-gradient-to-r from-rose-50 to-purple-50"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-16" variants={itemVariants}>
						<h2 className="text-5xl font-bold mb-6 text-gray-800">
							How It Works
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Three simple steps to get the women's mental health support you deserve
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{processSteps.map((step, index) => (
							<motion.div
								key={step.step}
								className="text-center relative"
								variants={itemVariants}
								transition={{ delay: index * 0.2 }}
							>
								{/* Connection Line */}
								{index < processSteps.length - 1 && (
									<motion.div 
										className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-rose-300 to-purple-300"
										initial={{ scaleX: 0 }}
										whileInView={{ scaleX: 1 }}
										transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
									/>
								)}
								
								<motion.div 
									className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center relative`}
									whileHover={{ scale: 1.1, rotate: 5 }}
									transition={{ type: "spring", stiffness: 300 }}
								>
									<span className="text-3xl font-bold text-white mb-2">{step.step}</span>
									<step.icon className="w-8 h-8 text-white absolute bottom-4" />
								</motion.div>
								
								<h3 className="text-2xl font-bold mb-4 text-gray-800">
									{step.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{step.description}
								</p>
							</motion.div>
						))}
					</div>				</div>
			</motion.section>

			{/* Risk Comparison Analysis */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-4xl font-bold mb-4 text-gray-800">
							Multiple Pathways to Risk
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Understanding how both clinical symptoms and lifestyle factors contribute to mental health challenges
						</p>
					</motion.div>
					
					<div className="grid lg:grid-cols-3 gap-8 items-start">
						<div>
							<RiskComparisonChart />
						</div>
						<div className="lg:col-span-2 space-y-6">
							<motion.div 
								className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
								variants={itemVariants}
							>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">
									Dual Assessment Approach
								</h3>
								<p className="text-gray-600 leading-relaxed mb-4">
									Our research reveals that both clinical depression assessment and lifestyle risk factors 
									show alarming rates of risk, confirming that mental health challenges have multiple contributing pathways.
								</p>
								<div className="grid md:grid-cols-2 gap-4">
									<div className="bg-red-50 rounded-xl p-4">
										<h4 className="font-bold text-red-700 mb-2">Clinical Assessment</h4>
										<p className="text-2xl font-bold text-red-600">81.3%</p>
										<p className="text-sm text-gray-600">16,150 women assessed</p>
										<p className="text-xs text-gray-500 mt-2">Based on PHQ-9 compatible depression indicators</p>
									</div>
									<div className="bg-orange-50 rounded-xl p-4">
										<h4 className="font-bold text-orange-700 mb-2">Lifestyle Risk</h4>
										<p className="text-2xl font-bold text-orange-600">65.7%</p>
										<p className="text-sm text-gray-600">604 people assessed</p>
										<p className="text-xs text-gray-500 mt-2">Based on 30+ lifestyle risk factors</p>
									</div>
								</div>
							</motion.div>
							
							<motion.div 
								className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-gray-800 mb-3">
									What This Means for You
								</h4>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-start gap-3">
										<Brain className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Clinical symptoms aren't the only indicator</span>
											<p className="text-sm text-gray-500 mt-1">Lifestyle factors can predict depression risk even before symptoms appear</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Prevention is possible</span>
											<p className="text-sm text-gray-500 mt-1">Addressing lifestyle factors can prevent clinical depression</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Comprehensive care is essential</span>
											<p className="text-sm text-gray-500 mt-1">Both medical and lifestyle interventions maximize success</p>
										</div>
									</li>
								</ul>
							</motion.div>
							
							<motion.div 
								className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-gray-800 mb-3">
									Key Insights from Our Research
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
									<div>
										<h5 className="font-semibold text-gray-700 mb-2">Clinical Factors:</h5>
										<ul className="space-y-1 text-gray-600">
											<li>• Sleep disturbances</li>
											<li>• Mood changes</li>
											<li>• Appetite variations</li>
											<li>• Energy depletion</li>
											<li>• Concentration issues</li>
										</ul>
									</div>
									<div>
										<h5 className="font-semibold text-gray-700 mb-2">Lifestyle Factors:</h5>
										<ul className="space-y-1 text-gray-600">
											<li>• Social isolation</li>
											<li>• Work-life balance</li>
											<li>• Financial stress</li>
											<li>• Relationship quality</li>
											<li>• Physical activity</li>
										</ul>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Impact Metrics */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-16" variants={itemVariants}>
						<h2 className="text-5xl font-bold mb-6 text-gray-800">
							Our Impact
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Making a real difference in women's mental health outcomes
						</p>
					</motion.div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						{impactMetrics.map((metric, index) => (
							<motion.div
								key={metric.label}
								className={`text-center p-6 ${metric.bgColor} rounded-2xl shadow-lg border border-white/20`}
								variants={itemVariants}
								whileHover={{ 
									scale: 1.05,
									y: -5,
									boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
								}}
								transition={{ delay: index * 0.1 }}
							>
								<motion.div 
									className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center`}
									animate={{ rotate: [0, 5, -5, 0] }}
									transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
								>
									<metric.icon className={`w-8 h-8 ${metric.color}`} />
								</motion.div>
								<h3 className="text-2xl font-bold text-gray-800 mb-2">{metric.value}</h3>
								<p className="text-sm text-gray-600">{metric.label}</p>
							</motion.div>
						))}
					</div>				</div>
			</motion.section>

			{/* Depression Severity Spectrum */}
			<motion.section 
				className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-4xl font-bold mb-4 text-gray-800">
							Where Do You Stand?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Understanding the spectrum of mental health helps identify the right level of support
						</p>
					</motion.div>
					
					<SeveritySpectrumChart />
					
					<motion.div 
						className="mt-12 text-center"
						variants={itemVariants}
					>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
							<h3 className="text-2xl font-bold text-gray-800 mb-6">
								Take the First Step
							</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Whether you're in the normal range and want to maintain wellness, or dealing with more severe symptoms, 
								professional support is available at every level. Understanding where you are is the first step to getting the right care.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									to="/signup"
									className="inline-block px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Get Assessment
								</Link>
								<Link
									to="/login"
									className="inline-block px-8 py-3 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
								>
									Find Support
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Testimonials */}
			<motion.section 
				className="relative z-10 py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-16" variants={itemVariants}>
						<h2 className="text-5xl font-bold mb-6 text-gray-800">
							Stories of Hope & Healing
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Real experiences from mothers who found their strength through our platform
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden group"
								variants={itemVariants}
								whileHover={{ 
									y: -8,
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
								}}
								transition={{ delay: index * 0.2 }}
							>
								{/* Background Gradient */}
								<div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								
								<div className="relative z-10">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
									/>
									
									{/* Star rating */}
									<div className="flex justify-center mb-6">
										{[...Array(testimonial.rating)].map((_, i) => (
											<motion.div
												key={i}
												initial={{ scale: 0, rotate: -180 }}
												whileInView={{ scale: 1, rotate: 0 }}
												transition={{ delay: index * 0.1 + i * 0.1, type: "spring", stiffness: 200 }}
											>
												<Star className="w-5 h-5 text-yellow-500 fill-current" />
											</motion.div>
										))}
									</div>
									
									<p className="italic text-gray-700 mb-6 leading-relaxed text-center">
										"{testimonial.text}"
									</p>
									<div className="text-center">
										<span className="font-bold text-gray-800 block text-lg">
											{testimonial.name}
										</span>
										<span className="text-sm text-gray-600 block mb-1">
											{testimonial.title}
										</span>
										<span className="text-xs text-gray-500">
											{testimonial.location}
										</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>				</div>
			</motion.section>

			{/* Early Warning Indicators */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-4xl font-bold mb-4 text-gray-800">
							Recognize the Warning Signs
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Early detection can prevent mental health crises. Learn to recognize these key indicators.
						</p>
					</motion.div>
					
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<EarlyWarningChart />
						</div>						<div className="space-y-6">
							<motion.div 
								className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
								variants={itemVariants}
							>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">
									Prevention is Key
								</h3>
								<p className="text-gray-600 leading-relaxed mb-4">
									Recognizing early warning signs allows for timely intervention, 
									preventing the escalation from mild symptoms to severe depression.
								</p>
								<p className="text-gray-600 leading-relaxed mb-4">
									If you identify with several of these indicators, 
									professional support can help you get back on track.
								</p>
								
								{/* Warning Signs Statistics */}
								<div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mt-4">
									<h5 className="font-bold text-gray-800 mb-2">Most Common Warning Signs:</h5>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span>Sleep Issues</span>
											<span className="font-bold text-purple-600">78.2% affected</span>
										</div>
										<div className="flex justify-between">
											<span>Appetite Changes</span>
											<span className="font-bold text-cyan-600">71.5% affected</span>
										</div>
										<div className="flex justify-between">
											<span>Energy Loss</span>
											<span className="font-bold text-green-600">69.3% affected</span>
										</div>
									</div>
								</div>
							</motion.div>
							
							<motion.div 
								className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-gray-800 mb-3">
									When to Seek Help
								</h4>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-start gap-3">
										<Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Multiple warning signs present for 2+ weeks</span>
											<p className="text-sm text-gray-500 mt-1">Duration is key - temporary stress vs persistent symptoms</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Brain className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Symptoms interfering with daily life</span>
											<p className="text-sm text-gray-500 mt-1">Work, self-care, or household tasks become difficult</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Impact on relationships and parenting</span>
											<p className="text-sm text-gray-500 mt-1">Difficulty connecting with family or friends</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<div>
											<span className="font-semibold">Feeling overwhelmed or hopeless</span>
											<p className="text-sm text-gray-500 mt-1">Persistent negative thoughts about the future</p>
										</div>
									</li>
								</ul>
							</motion.div>
							
							<motion.div 
								className="bg-red-50 rounded-2xl p-6 border border-red-200"
								variants={itemVariants}
							>
								<h4 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
									<Shield className="w-5 h-5" />
									Critical Warning Signs
								</h4>
								<p className="text-red-600 font-semibold mb-3">Seek immediate help if experiencing:</p>
								<ul className="space-y-2 text-red-700 text-sm">
									<li>• Thoughts of self-harm or suicide</li>
									<li>• Inability to care for yourself or your baby</li>
									<li>• Severe anxiety or panic attacks</li>
									<li>• Hallucinations or delusions</li>
									<li>• Complete loss of appetite or sleep</li>
								</ul>
								<div className="mt-4 p-3 bg-red-100 rounded-lg">
									<p className="text-red-800 font-semibold text-sm">
										Emergency: Call 988 (Suicide Prevention) or 911
									</p>
								</div>
							</motion.div>
							
							<motion.div 
								className="text-center"
								variants={itemVariants}
							>
								<Link
									to="/signup"
									className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
								>
									Get Professional Assessment
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Final CTA Section */}
			<motion.section 
				className="relative z-10 py-20 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white overflow-hidden"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Background Effects */}
				<motion.div 
					className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
					animate={{ x: ["-100%", "100%"] }}
					transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
				/>
				
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<motion.h2 
						className="text-5xl md:text-6xl font-bold mb-6"
						variants={itemVariants}
					>
						You Don't Have to Suffer in Silence
					</motion.h2>
					<motion.p 
						className="text-xl md:text-2xl mb-8 opacity-90"
						variants={itemVariants}
					>
						Join thousands of women who have found hope, healing, and support through Mindhaven
					</motion.p>
					
					<motion.div 
						className="flex flex-col sm:flex-row gap-4 justify-center items-center"
						variants={itemVariants}
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								to="/signup"
								className="inline-block px-12 py-5 bg-white text-purple-600 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50"
							>
								<span className="flex items-center gap-3">
									Get Started Today
									<ArrowRight className="w-5 h-5" />
								</span>
							</Link>
						</motion.div>
								<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								to="/login"
								className="inline-block px-12 py-5 bg-transparent border-2 border-white text-white rounded-xl text-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
							>
								<span className="flex items-center gap-3">
									<Phone className="w-5 h-5" />
									Support
								</span>
							</Link>
						</motion.div>
					</motion.div>
							<motion.p 
						className="text-sm opacity-75 mt-6"
						variants={itemVariants}
					>
						Support available immediately • No insurance required • Completely confidential
					</motion.p>
				</div>
			</motion.section>

			{/* Bottom Benefits Marquee */}
			<div className="w-full bg-gradient-to-r from-purple-600/95 to-blue-600/95 py-3 overflow-hidden shadow-lg">
				<Marquee speed={30}>
					<div className="flex items-center text-white text-sm font-medium tracking-wide">
						{platformBenefits.map((benefit, index) => (
							<span key={index} className="whitespace-nowrap px-4 flex items-center">
								<Heart className="w-3 h-3 mr-2" />
								{benefit}
							</span>
						))}
					</div>
				</Marquee>
			</div>			{/* Footer */}
			<motion.footer 
				className="relative z-10 py-16 text-center text-gray-600 bg-white/90 backdrop-blur-sm border-t border-gray-200"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.8 }}
			>
				<div className="max-w-6xl mx-auto px-4">
					{/* Logo and Main Title */}
					<motion.div 
						className="flex items-center justify-center gap-4 mb-8"
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 300 }}
					>						<motion.img 
							src="/front_logo.png" 
							alt="Mindhaven Logo" 
							className="w-12 h-12 object-contain drop-shadow-lg"
							animate={{ rotate: [0, 5, -5, 0] }}
							transition={{ duration: 4, repeat: Infinity }}
						/><div className="text-left">
							<h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
								Mindhaven
							</h3>
							<p className="text-sm text-gray-600">Women's Mental Health Platform</p>
						</div>
					</motion.div>

					{/* Key Features */}
					<motion.div 
						className="flex flex-wrap justify-center gap-6 mb-12 text-sm"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>						{[
							"Specialized Women's Care",
							"24/7 Support", 
							"Licensed Female Therapists",
							"Evidence-Based Treatment",
							"HIPAA Compliant",
							"Insurance Accepted"
						].map((feature, index) => (
							<motion.span 
								key={feature}
								className="px-4 py-2 bg-gradient-to-r from-rose-100 to-purple-100 text-gray-700 rounded-full border border-gray-200"
								variants={itemVariants}
								whileHover={{ scale: 1.05, y: -2 }}
								transition={{ delay: index * 0.1 }}
							>
								{feature}
							</motion.span>
						))}
					</motion.div>					{/* Footer Links */}
					<div className="grid md:grid-cols-4 gap-8 mb-12 text-sm">
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Getting Started</h4>
							<ul className="space-y-3">
								<li><Link to="/get-started" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> How It Works
								</Link></li>
								<li><Link to="/therapist-booking" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Find Specialists
								</Link></li>
								<li><Link to="/wellness-metrics" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Treatment Plans
								</Link></li>
								<li><Link to="/personalization-quiz" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Assessment
								</Link></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Women's Support</h4>
							<ul className="space-y-3">
								<li><Link to="/depression-quiz" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Heart className="w-3 h-3" /> Depression Support
								</Link></li>
								<li><Link to="/mental-health-score" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Brain className="w-3 h-3" /> Anxiety Assessment
								</Link></li>
								<li><Link to="/content-recommendations" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Shield className="w-3 h-3" /> Resources
								</Link></li>
								<li><Link to="/communities" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Users className="w-3 h-3" /> Support Groups
								</Link></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
							<ul className="space-y-3">
								<li><a href="https://www.nami.org/Help" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<BookOpen className="w-3 h-3" /> Mental Health Resources
								</a></li>
								<li><a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<Shield className="w-3 h-3" /> Crisis Support
								</a></li>
								<li><a href="https://www.womenshealth.gov/mental-health" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<CheckCircle className="w-3 h-3" /> Women's Health Info
								</a></li>
								<li><a href="https://www.cdc.gov/reproductivehealth/features/mental-health-women/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<Lightbulb className="w-3 h-3" /> CDC Women's Mental Health
								</a></li>
							</ul>
						</div>						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Emergency Support</h4>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<Phone className="w-3 h-3 text-red-500" />
									<a href="tel:988" className="font-semibold text-red-600 hover:underline">Crisis Line: 988</a>
								</li>
								<li className="flex items-center gap-2">
									<MessageCircle className="w-3 h-3 text-purple-500" />
									<a href="mailto:support@mindhaven.com" className="hover:underline">support@mindhaven.com</a>
								</li>
								<li className="flex items-center gap-2">
									<Clock className="w-3 h-3 text-blue-500" />
									<span>24/7 Immediate Response</span>
								</li>
								<li className="text-xs text-gray-500 pt-2">
									Available for women's mental health support
								</li>
							</ul>
						</div>
					</div>					{/* Crisis Resources */}
					<motion.div 
						className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 mb-8"
						whileHover={{ scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
							<Shield className="w-5 h-5" />
							Crisis Resources
						</h4>
						<div className="grid md:grid-cols-3 gap-4 text-sm">
							<div>
								<strong>National Suicide Prevention:</strong><br />
								<a href="tel:988" className="text-red-600 font-semibold hover:underline">988</a>
							</div>
							<div>
								<strong>Women's Mental Health Helpline:</strong><br />
								<a href="tel:1-800-950-6264" className="text-red-600 font-semibold hover:underline">1-800-950-6264</a>
							</div>
							<div>
								<strong>Crisis Text Line:</strong><br />
								<a href="sms:741741?body=HOME" className="text-red-600 font-semibold hover:underline">Text HOME to 741741</a>
							</div>
						</div>
					</motion.div>					{/* Copyright */}
					<div className="border-t border-gray-200 pt-8">
						<p className="text-sm text-gray-500 mb-2">
							© {new Date().getFullYear()} Mindhaven. All rights reserved.
						</p>
						<p className="text-xs text-gray-400">
							Licensed women's mental health professionals • HIPAA compliant • Evidence-based treatment • Crisis support available 24/7
						</p>
						<p className="text-xs text-gray-400 mt-2">
							<strong>Disclaimer:</strong> Mindhaven provides mental health support and is not a substitute for emergency medical care. 
							If you are experiencing a medical emergency, please call 911 immediately.
						</p>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};

export default Landing;

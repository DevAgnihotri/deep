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

// Maternal Mental Health Crisis Statistics
const crisisStats = [
	{ 
		number: "970M+", 
		text: "People worldwide struggle with mental health challenges",
		icon: Globe,
		color: "from-rose-400 to-pink-500",
		description: "Mental health crisis affects nearly 1 billion people globally"
	},
	{ 
		number: "1 in 7", 
		text: "New mothers experience postpartum depression",
		icon: Baby,
		color: "from-purple-400 to-violet-500",
		description: "Maternal mental health crisis touches millions of families"
	},
	{ 
		number: "Only 15%", 
		text: "Of mothers with PPD receive proper treatment",
		icon: Stethoscope,
		color: "from-blue-400 to-cyan-500",
		description: "Critical treatment gap leaves mothers without support"
	},
	{ 
		number: "$32,000", 
		text: "Average cost per untreated maternal mental health case",
		icon: TrendingUp,
		color: "from-amber-400 to-orange-500",
		description: "Economic and human toll of untreated maternal conditions"
	},
];

// Revolutionary Maternal Mental Health Solutions
const solutions = [
	{
		title: "Specialized Maternal Care",
		desc: "Evidence-based treatment for postpartum depression, pregnancy anxiety, and perinatal mood disorders by certified specialists.",
		icon: Baby,
		gradient: "from-rose-400 to-pink-500",
		features: ["Postpartum Depression Treatment", "Pregnancy Anxiety Support", "Perinatal Mood Disorders", "Birth Trauma Recovery"]
	},
	{
		title: "24/7 Support",
		desc: "Immediate help when you need it most. Specialized maternal mental health crisis intervention available around the clock.",
		icon: Shield,
		gradient: "from-purple-400 to-violet-500",
		features: ["Instant Crisis Response", "Maternal Emergency Support", "24/7 Helpline", "Immediate Intervention"]
	},
	{
		title: "AI-Powered Personalization",
		desc: "Advanced technology creates individualized treatment plans tailored specifically for maternal and family mental health needs.",
		icon: Brain,
		gradient: "from-blue-400 to-cyan-500",
		features: ["Personalized Treatment Plans", "AI Assessment Tools", "Progress Tracking", "Adaptive Care Paths"]
	},
	{
		title: "Perinatal Specialist Network",
		desc: "Connect with board-certified therapists who specialize in maternal mental health, pregnancy, and postpartum care.",
		icon: HeartHandshake,
		gradient: "from-green-400 to-emerald-500",
		features: ["Certified Perinatal Therapists", "Maternal Health Experts", "Specialized Training", "Evidence-Based Approaches"]
	},
];

// Powerful Impact Metrics
const impactMetrics = [
	{ icon: Users, label: "Mothers Helped", value: "85+", color: "text-rose-600", bgColor: "bg-rose-50" },
	{ icon: Heart, label: "Recovery Success", value: "94%", color: "text-purple-600", bgColor: "bg-purple-50" },
	{ icon: Award, label: "Specialist Therapists", value: "47", color: "text-blue-600", bgColor: "bg-blue-50" },
	{ icon: Clock, label: "Crisis Response", value: "24/7", color: "text-green-600", bgColor: "bg-green-50" },
	{ icon: Shield, label: "Privacy Protected", value: "100%", color: "text-indigo-600", bgColor: "bg-indigo-50" },
	{ icon: Sparkles, label: "Treatment Plans", value: "Custom", color: "text-amber-600", bgColor: "bg-amber-50" },
];

// Comprehensive Benefits
const platformBenefits = [
	"MATERNAL MENTAL HEALTH SPECIALISTS",
	"POSTPARTUM DEPRESSION TREATMENT", 
	"PREGNANCY ANXIETY SUPPORT",
	"24/7 CRISIS INTERVENTION",
	"PERINATAL MOOD DISORDER CARE",
	"AI-POWERED PERSONALIZATION",
	"HIPAA COMPLIANT SECURITY",
	"FLEXIBLE SCHEDULING",
	"INSURANCE ACCEPTED",
	"EVIDENCE-BASED THERAPY",
	"FAMILY SUPPORT PROGRAMS",
	"BIRTH TRAUMA RECOVERY",
	"BREASTFEEDING SUPPORT",
	"COMMUNITY CONNECTIONS"
];

const testimonials = [
	{
		name: "Sarah Martinez",
		text: "All in Awareness saved my life during my battle with postpartum depression. The specialized maternal care and understanding I received was exactly what I needed as a new mother. I finally felt heard and supported.",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "New Mother, PPD Survivor",
		location: "California"
	},
	{
		name: "Dr. Emily Chen",
		text: "As a board-certified perinatal psychologist, I'm incredibly impressed by All in Awareness's evidence-based approach to maternal mental health. This platform truly addresses the critical treatment gap in maternal care.",
		avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "Perinatal Psychologist",
		location: "New York"
	},
	{
		name: "Maria Rodriguez",
		text: "The community support and specialized therapy helped me through severe pregnancy anxiety. The 24/7 support gave me peace of mind knowing help was always available. I felt understood and supported every step of the way.",
		avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
		rating: 5,
		title: "Expecting Mother",
		location: "Texas"
	},
];

// How It Works Process
const processSteps = [
	{
		step: "01",
		title: "Take Assessment",
		description: "Complete our specialized maternal mental health screening designed by perinatal experts",
		icon: CheckCircle,
		color: "from-rose-400 to-pink-500"
	},
	{
		step: "02", 
		title: "Get Matched",
		description: "Our AI connects you with certified maternal mental health specialists who understand your specific needs",
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
				>
					<img 
						src="/front_logo.png" 
						alt="All in Awareness Logo" 
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
						src="/front_logo.png" 
						alt="All in Awareness Logo" 
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
							All in Awareness
						</motion.h1>
						<p className="text-sm text-gray-700 font-medium tracking-wide">Maternal Mental Health Platform</p>
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
				>
					<p className="text-rose-700 font-semibold text-sm flex items-center gap-2">
						<Heart className="w-4 h-4 animate-pulse" />
						Addressing the maternal mental health crisis - You are not alone
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
					}}
				>
					All in Awareness
				</motion.h1>
				
				<motion.p 
					className="text-2xl md:text-4xl text-gray-800 mb-6 max-w-5xl mx-auto leading-relaxed font-light"
					variants={itemVariants}
				>
					Breaking barriers in <span className="font-semibold text-rose-600">maternal mental health</span>
				</motion.p>
				
				<motion.p 
					className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
					variants={itemVariants}
				>
					Specialized care for postpartum depression, pregnancy anxiety, and perinatal mood disorders. 
					Evidence-based treatment with certified maternal mental health specialists available 24/7.
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
					</motion.div>
				</motion.div>
			</motion.section>			{/* Solutions Section */}
			<motion.section 
				className="relative z-10 py-20 px-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="max-w-7xl mx-auto">
					<motion.div className="text-center mb-16" variants={itemVariants}>
						<h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
							Revolutionary Maternal Care
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive solutions designed specifically for maternal mental health challenges
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
					</div>
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
							Three simple steps to get the maternal mental health support you deserve
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
							Making a real difference in maternal mental health outcomes
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
					</div>
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
						Join thousands of mothers who have found hope, healing, and support through All in Awareness
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
					>
						<motion.img 
							src="/front_logo.png" 
							alt="All in Awareness Logo" 
							className="w-12 h-12 object-contain drop-shadow-lg"
							animate={{ rotate: [0, 5, -5, 0] }}
							transition={{ duration: 4, repeat: Infinity }}
						/>
						<div className="text-left">
							<h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
								All in Awareness
							</h3>
							<p className="text-sm text-gray-600">Maternal Mental Health Platform</p>
						</div>
					</motion.div>

					{/* Key Features */}
					<motion.div 
						className="flex flex-wrap justify-center gap-6 mb-12 text-sm"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{[
							"Specialized Maternal Care",
							"24/7 Support", 
							"Licensed Perinatal Therapists",
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
					</motion.div>

					{/* Footer Links */}
					<div className="grid md:grid-cols-4 gap-8 mb-12 text-sm">
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Getting Started</h4>
							<ul className="space-y-3">
								<li><a href="#" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> How It Works
								</a></li>
								<li><a href="#" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Find Specialists
								</a></li>
								<li><a href="#" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Treatment Plans
								</a></li>
								<li><a href="#" className="hover:text-rose-600 transition-colors flex items-center gap-2">
									<ArrowRight className="w-3 h-3" /> Assessment
								</a></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Maternal Support</h4>
							<ul className="space-y-3">
								<li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Baby className="w-3 h-3" /> Postpartum Depression
								</a></li>
								<li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Heart className="w-3 h-3" /> Pregnancy Anxiety
								</a></li>
								<li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Shield className="w-3 h-3" /> Support
								</a></li>
								<li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
									<Users className="w-3 h-3" /> Support Groups
								</a></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
							<ul className="space-y-3">
								<li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<BookOpen className="w-3 h-3" /> Help Center
								</a></li>
								<li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<Shield className="w-3 h-3" /> Privacy Policy
								</a></li>
								<li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<CheckCircle className="w-3 h-3" /> Terms of Service
								</a></li>
								<li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">
									<Lightbulb className="w-3 h-3" /> Mental Health Resources
								</a></li>
							</ul>
						</div>						<div>
							<h4 className="font-semibold text-gray-800 mb-4">Emergency Support</h4>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<Phone className="w-3 h-3 text-red-500" />
									<span className="font-semibold text-red-600">Support Line</span>
								</li>
								<li className="flex items-center gap-2">
									<MessageCircle className="w-3 h-3 text-purple-500" />
									<span>support@allinawareness.com</span>
								</li>
								<li className="flex items-center gap-2">
									<Clock className="w-3 h-3 text-blue-500" />
									<span>Immediate Response</span>
								</li>
								<li className="text-xs text-gray-500 pt-2">
									Available for maternal mental health support
								</li>
							</ul>
						</div>
					</div>

					{/* Crisis Resources */}
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
								<span className="text-red-600 font-semibold">988</span>
							</div>
							<div>
								<strong>Postpartum Support International:</strong><br />
								<span className="text-red-600 font-semibold">1-800-944-4773</span>
							</div>
							<div>
								<strong>Crisis Text Line:</strong><br />
								<span className="text-red-600 font-semibold">Text HOME to 741741</span>
							</div>
						</div>
					</motion.div>

					{/* Copyright */}
					<div className="border-t border-gray-200 pt-8">
						<p className="text-sm text-gray-500 mb-2">
							© {new Date().getFullYear()} All in Awareness. All rights reserved.
						</p>
						<p className="text-xs text-gray-400">
							Licensed maternal mental health professionals • HIPAA compliant • Evidence-based treatment • Crisis support available 24/7
						</p>
						<p className="text-xs text-gray-400 mt-2">
							<strong>Disclaimer:</strong> All in Awareness provides mental health support and is not a substitute for emergency medical care. 
							If you are experiencing a medical emergency, please call 911 immediately.
						</p>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};

export default Landing;

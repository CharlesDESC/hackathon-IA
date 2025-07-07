import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	ArrowRight,
	HelpCircle,
	Gamepad2,
	Lightbulb,
	Play,
	Video,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

// Import images
import digitalPollutionImage1 from "@shared/images/pic1.png";
import digitalPollutionImage2 from "@shared/images/pic2.png";
import digitalPollutionImage3 from "@shared/images/pic3.png";
import educationalVideo from "@shared/videos/demo.mp4";

const carouselImages = [
	{
		src: digitalPollutionImage3,
		alt: "Smartphone iceberg digital pollution concept",
	},
	{
		src: digitalPollutionImage2,
		alt: "Cloud pollution server concept",
	},
	{
		src: digitalPollutionImage1,
		alt: "Digital tree environmental impact",
	},
];

export default function Home() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 4000 }),
	]);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<div className='text-center'>
			{/* Hero Section with Carousel */}
			<div className='relative rounded-3xl overflow-hidden mb-8 h-96'>
				<div className='embla w-full h-full' ref={emblaRef}>
					<div className='embla__container flex w-full h-full'>
						{carouselImages.map((image, index) => (
							<div
								key={index}
								className='embla__slide flex-[0_0_100%] relative'
							>
								<div className='absolute inset-0'>
									<img
										src={image.src}
										alt={image.alt}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-blue-600/70'></div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Content overlay */}
				<div className='absolute inset-0 z-10 flex items-center justify-center text-white'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg'>
							Déchets Numériques Secrets
						</h1>
						<p className='text-xl md:text-2xl mb-8 drop-shadow-md'>
							Nettoyez Votre Cloud Invisible !
						</p>
						<Link href='/questionnaire'>
							<Button
								size='lg'
								className='bg-pollution-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg'
							>
								Commencer l'Évaluation <ArrowRight className='ml-2 h-5 w-5' />
							</Button>
						</Link>
					</div>
				</div>

				{/* Navigation buttons */}
				<Button
					variant='ghost'
					size='icon'
					className='absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full'
					onClick={scrollPrev}
					disabled={!canScrollPrev}
				>
					<ChevronLeft className='h-6 w-6' />
				</Button>

				<Button
					variant='ghost'
					size='icon'
					className='absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full'
					onClick={scrollNext}
					disabled={!canScrollNext}
				>
					<ChevronRight className='h-6 w-6' />
				</Button>
			</div>

			{/* Video Section */}
			<div className='mb-12'>
				<Card className='shadow-lg'>
					<CardContent className='p-8'>
						<div className='mb-6'>
							<Video className='h-12 w-12 text-cloud-blue mb-4 mx-auto' />
							<h2 className='text-2xl font-bold text-gray-900 mb-2'>
								Découvrez la Pollution Numérique
							</h2>
						</div>
						<div className='relative bg-gray-900 rounded-xl overflow-hidden h-96 md:h-[45rem]'>
							<video
								className='w-full h-full object-cover'
								controls
								poster={digitalPollutionImage2}
								preload='metadata'
							>
								<source src={educationalVideo} type='video/mp4' />
								Votre navigateur ne supporte pas la lecture de vidéos.
							</video>

							{/* Overlay with subtle hover effect */}
							<div className='absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300 pointer-events-none'></div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Features Grid */}
			<div className='grid md:grid-cols-3 gap-8 mb-12'>
				<Link href='/questionnaire'>
					<Card className='card-hover cursor-pointer transition-all duration-300 hover:shadow-xl'>
						<CardContent className='p-6'>
							<HelpCircle className='h-12 w-12 text-cloud-blue mb-4 mx-auto' />
							<h3 className='text-xl font-semibold mb-2'>
								Quiz de Pollution Numérique
							</h3>
							<p className='text-gray-600'>
								Évaluez votre empreinte numérique avec notre questionnaire
								complet
							</p>
							<div className='mt-4 flex items-center justify-center text-cloud-blue'>
								<span className='text-sm font-medium'>Commencer le Quiz</span>
								<ArrowRight className='ml-2 h-4 w-4' />
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link href='/minigame'>
					<Card className='card-hover cursor-pointer transition-all duration-300 hover:shadow-xl'>
						<CardContent className='p-6'>
							<Gamepad2 className='h-12 w-12 text-green-500 mb-4 mx-auto' />
							<h3 className='text-xl font-semibold mb-2'>
								Jeu de Nettoyage Serveur
							</h3>
							<p className='text-gray-600'>
								Apprenez à travers un jeu interactif la gestion des déchets
								numériques
							</p>
							<div className='mt-4 flex items-center justify-center text-green-500'>
								<span className='text-sm font-medium'>Jouer</span>
								<ArrowRight className='ml-2 h-4 w-4' />
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link href='/tips'>
					<Card className='card-hover cursor-pointer transition-all duration-300 hover:shadow-xl'>
						<CardContent className='p-6'>
							<Lightbulb className='h-12 w-12 text-yellow-500 mb-4 mx-auto' />
							<h3 className='text-xl font-semibold mb-2'>
								Conseils Personnalisés
							</h3>
							<p className='text-gray-600'>
								Obtenez des conseils adaptés pour réduire votre impact
								environnemental numérique
							</p>
							<div className='mt-4 flex items-center justify-center text-yellow-500'>
								<span className='text-sm font-medium'>Voir les Conseils</span>
								<ArrowRight className='ml-2 h-4 w-4' />
							</div>
						</CardContent>
					</Card>
				</Link>
			</div>
		</div>
	);
}

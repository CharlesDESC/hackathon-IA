import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Fan, CloudUpload, Video, Images, Trash2, Bot, Smartphone, Leaf, Recycle, Tv, X } from "lucide-react";

interface TipBubble {
  id: string;
  icon: React.ComponentType<any>;
  color: string;
  tip: string;
  position: string;
  animationDelay: string;
}

const tipBubbles: TipBubble[] = [
  {
    id: "email",
    icon: Mail,
    color: "text-red-500",
    tip: "Désabonnez-vous des newsletters que vous ne lisez jamais pour réduire le stockage serveur et l'encombrement de votre boîte mail.",
    position: "top-16 left-16",
    animationDelay: "0s",
  },
  {
    id: "cleanup",
    icon: Fan,
    color: "text-blue-500",
    tip: "Nettoyez votre boîte mail chaque semaine pour réduire le stockage serveur et améliorer les performances email.",
    position: "top-20 right-20",
    animationDelay: "0.5s",
  },
  {
    id: "cloud",
    icon: CloudUpload,
    color: "text-purple-500",
    tip: "Évitez de stocker des fichiers inutiles dans le cloud pour réduire la consommation énergétique des centres de données.",
    position: "bottom-32 left-20",
    animationDelay: "1s",
  },
  {
    id: "video",
    icon: Video,
    color: "text-green-500",
    tip: "Diminuez la résolution de streaming vidéo quand la haute qualité n'est pas nécessaire pour réduire l'usage de bande passante.",
    position: "bottom-16 right-16",
    animationDelay: "1.5s",
  },
  {
    id: "images",
    icon: Images,
    color: "text-yellow-500",
    tip: "Supprimez les photos et vidéos en double pour libérer l'espace de stockage et réduire l'énergie de synchronisation cloud.",
    position: "top-32 left-1/2 transform -translate-x-1/2",
    animationDelay: "2s",
  },
  {
    id: "trash",
    icon: Trash2,
    color: "text-red-500",
    tip: "Videz votre corbeille régulièrement pour vous assurer que les fichiers supprimés ne continuent pas à consommer de l'espace de stockage.",
    position: "bottom-24 left-1/2 transform -translate-x-1/2",
    animationDelay: "2.5s",
  },
  {
    id: "ai",
    icon: Bot,
    color: "text-indigo-500",
    tip: "Limitez l'utilisation de l'IA quand ce n'est pas essentiel car les modèles IA nécessitent des ressources informatiques importantes.",
    position: "top-40 right-32",
    animationDelay: "3s",
  },
  {
    id: "mobile",
    icon: Smartphone,
    color: "text-cyan-500",
    tip: "Optimisez le stockage de votre smartphone en supprimant les applications inutilisées et en vidant le cache régulièrement.",
    position: "bottom-40 left-32",
    animationDelay: "3.5s",
  },
];

export default function Tips() {
  const [selectedTip, setSelectedTip] = useState<TipBubble | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Conseils pour Réduire la Pollution Numérique
        </h2>
        <p className="text-gray-600 text-lg">
          Conseils interactifs pour vous aider à réduire votre impact environnemental numérique
        </p>
      </div>

      <div className="relative min-h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 overflow-hidden mb-12">
        {/* Floating tip bubbles */}
        {tipBubbles.map((bubble) => {
          const IconComponent = bubble.icon;
          return (
            <div
              key={bubble.id}
              className={`absolute animate-float ${bubble.position}`}
              style={{ animationDelay: bubble.animationDelay }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 h-16 w-16"
                onClick={() => setSelectedTip(bubble)}
              >
                <IconComponent className={`h-8 w-8 ${bubble.color}`} />
              </Button>
            </div>
          );
        })}

        {/* Center instruction */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <Card className="bg-white bg-opacity-90 shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl text-gray-600 mb-4">👆</div>
              <h3 className="text-xl font-semibold mb-2">Cliquez sur les conseils flottants !</h3>
              <p className="text-gray-600">
                Chaque bulle contient des conseils pratiques pour réduire votre empreinte numérique
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tip Modal */}
        {selectedTip && (
          <Dialog open={!!selectedTip} onOpenChange={() => setSelectedTip(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  💡 Conseil
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-auto"
                    onClick={() => setSelectedTip(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-700">{selectedTip.tip}</p>
                <Button
                  onClick={() => setSelectedTip(null)}
                  className="w-full bg-pollution-green hover:bg-green-600"
                >
                  Compris !
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Static Tips Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Leaf className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gestion des Emails</h3>
            <p className="text-gray-600 text-sm">
              Le nettoyage régulier des emails et le désabonnement des newsletters non désirées peut
              réduire significativement les besoins de stockage serveur.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Recycle className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Organisation des Données</h3>
            <p className="text-gray-600 text-sm">
              Organisez et archivez régulièrement les anciens fichiers pour maintenir un stockage numérique propre
              et réduire la synchronisation cloud inutile.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tv className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Habitudes de Streaming</h3>
            <p className="text-gray-600 text-sm">
              Ajustez les paramètres de qualité vidéo et téléchargez du contenu pour le regarder hors ligne afin de
              réduire la bande passante de streaming.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

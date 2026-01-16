import { Home, Scale, Users, Heart, Book, Car, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

const ICONS: { [key: string]: React.FC<any> } = {
    home: Home,
    scale: Scale,
    users: Users,
    heart: Heart,
    book: Book,
    car: Car,
    mapPin: MapPin,
    phone: Phone,
    mail: Mail,
    externalLink: ExternalLink,
}

interface DynamicIconProps {
    name: string
    className?: string
    size?: number
}

export function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
    const IconComponent = ICONS[name?.toLowerCase()] || Home
    return <IconComponent className={className} size={size} />
}

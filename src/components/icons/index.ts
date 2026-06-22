/**
 * AgeZero UI icon library.
 *
 * A hand-rolled, 70-icon set in the AgeZero UI signature style:
 * linear, 1.5px stroke, 24×24 viewBox, currentColor. Inspired by Phosphor
 * and Lucide but drawn from scratch.
 *
 * Usage:
 *   import { Brain, Bot, Wrench, Check, Loader } from "@/components/icons";
 *   <Brain size={20} className="text-primary" />
 *
 * The icons are split across eight thematic files and re-exported here so
 * consumers can either pull from a specific group (`@/components/icons/brand`)
 * or the canonical barrel.
 */

export * from "./types";

// Brand / AI
export {
  Brain,
  Cpu,
  Bot,
  Sparkles,
  Wand,
  Atom,
  Circuit,
  Chip,
  Network,
  Robot,
} from "./brand";

// Agents / Tools
export {
  Wrench,
  Hammer,
  Code,
  Terminal,
  Webhook,
  Plug,
  Function,
  Database,
  Globe,
  KeyRound,
} from "./agents";

// UI / Nav
export {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  Search,
  Bell,
  User,
  Settings,
  Mail,
  Plus,
  Clock,
  Calendar,
  Users,
  MapPin,
  Lock,
  Layers,
  Boxes,
  Eye,
  Twitter,
  Linkedin,
  Layout,
  Box,
  Newspaper,
  BookOpen,
  MonitorPlay,
  Quote,
  Type,
  Activity,
  ShoppingCart,
  DollarSign,
  BarChart,
  TrendingDown,
  Sidebar,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  Hash,
  AtSign,
  Asterisk,
} from "./ui";

// Status
export {
  Check,
  X,
  AlertCircle,
  Info,
  Loader,
  Circle,
  Square,
  Triangle,
  Zap,
  Flame,
  CircleCheck,
  Star,
  Shield,
  TrendingUp,
  ChartLine,
  Award,
  Crown,
  Flag,
  Tag,
  Heart,
  Bookmark,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Sunrise,
  Sunset,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Smile,
  Frown,
  Meh,
  StarOff,
} from "./status";

// Media (play, image, mic, ...)
export {
  Play,
  Pause,
  Image as ImageIcon,
  Image as Image,
  Camera,
  Mic,
  Video,
  Music,
  Volume,
  MicOff,
  VideoOff,
  VolumeX,
  Cast,
  Airplay,
  Speaker,
} from "./media";

// Communication (chat, mail, phone, ...)
export {
  MessageSquare,
  MessageCircle,
  Messages,
  Phone,
  VideoCall,
  Send,
  At,
  Link,
} from "./communication";

// Arrows (chevrons, full arrows, diagonal, move)
export {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownLeft,
  Move,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Repeat,
  Shuffle,
} from "./arrows";

// Files (file, folder, download, upload, ...)
export {
  File,
  Folder,
  Download,
  Upload,
  Save,
  Copy,
  Clipboard,
  Trash,
  FileText,
  GitBranch,
  Briefcase,
} from "./files";
// Extras (slash, git merge, paperclip, check-circle)
export {
  Slash,
  GitMerge,
  Paperclip,
  CheckCircle,
} from "./extras";
// Extras batch 2
export { RefreshCw, Home, Apple, Smartphone, Github } from "./extras";
// Extras batch 3
export { Workflow, Pen } from "./extras";
// Extras batch 4
export { Rocket, Bug, Youtube } from "./extras";
// Extras batch 5
export { CornerDownLeft } from "./extras";
// Extras batch 6
export { ExternalLink } from "./extras";

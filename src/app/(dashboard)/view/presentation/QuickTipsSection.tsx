/**
 * Quick Tips Section Component
 * Location: app/(dashboard)/view/presentation/QuickTipsSection.tsx
 * 
 * Section displaying helpful tips and best practices for organizers
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Lightbulb,
  ExternalLink,
  CheckCircle,
  Zap,
  Users,
  Megaphone
} from 'lucide-react'

// Mock tips data - TODO: Replace with dynamic content or CMS
const quickTips = [
  {
    id: '1',
    title: 'Optimize Your Event Description',
    description: 'Use clear, compelling language that highlights what makes your event unique.',
    category: 'Marketing',
    icon: <Megaphone className="h-4 w-4" />,
    link: '/help/event-description'
  },
  {
    id: '2',
    title: 'Price Your Tickets Strategically',
    description: 'Research similar events and consider early bird pricing to boost initial sales.',
    category: 'Pricing',
    icon: <Zap className="h-4 w-4" />,
    link: '/help/pricing-strategy'
  },
  {
    id: '3',
    title: 'Engage Your Audience',
    description: 'Share regular updates and behind-the-scenes content to build excitement.',
    category: 'Engagement',
    icon: <Users className="h-4 w-4" />,
    link: '/help/audience-engagement'
  }
]

const bestPractices = [
  'Upload high-quality event posters (min 1200x630px)',
  'Include detailed venue information and directions',
  'Set up QR code check-in before event day',
  'Send reminder emails 24 hours before event',
  'Update attendees about any changes promptly'
]

export function QuickTipsSection() {
  return (
    <div className="space-y-6">
      {/* Quick Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quickTips.map((tip) => (
              <div key={tip.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {tip.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-0 h-auto text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Help Center
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

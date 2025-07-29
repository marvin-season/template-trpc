'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui'

export function SidebarNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className='text-lg font-semibold'>
                Apple AI
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      {item.items ? (
                        <Collapsible defaultOpen className='group/collapsible'>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className={`
                              w-full justify-between
                            `}>
                              <span>{item.title}</span>
                              <ChevronRight className={`
                                h-4 w-4 transition-transform
                                group-data-[state=open]/collapsible:rotate-90
                              `} />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.id}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={cn(
                                      pathname === subItem.href &&
                                        'bg-accent text-accent-foreground',
                                    )}
                                  >
                                    <Link href={subItem.href}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            pathname === item.href &&
                              'bg-accent text-accent-foreground',
                          )}
                        >
                          <Link href={item.href!}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className='flex flex-1 flex-col overflow-hidden'>
          <header className={`
            flex h-14 items-center border-b bg-white px-6 shadow-sm
          `}>
            <SidebarTrigger />
            <div className='ml-4'>
              <h1 className='text-lg font-semibold'>Apple AI Platform</h1>
            </div>
          </header>
          <main className='flex-1 overflow-auto p-6'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

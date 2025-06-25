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
                        <>
                          <SidebarMenuButton
                            asChild
                            className='w-full justify-start'
                          >
                            <div className='flex items-center gap-2'>
                              <span>{item.title}</span>
                              <ChevronRight className='h-4 w-4 transition-transform group-data-[state=open]:rotate-90' />
                            </div>
                          </SidebarMenuButton>
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
                        </>
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

        <div className='flex-1 flex flex-col overflow-hidden'>
          <header className='h-14 flex items-center px-6 border-b bg-white shadow-sm'>
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

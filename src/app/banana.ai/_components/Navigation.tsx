import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navigation } from '@/config/navigation'

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.items.map((item) => (
          <NavigationMenuItem key={item.id}>
            {item.items ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {item.items.map((subItem) => (
                      <NavigationMenuLink
                        key={subItem.id}
                        href={subItem.href}
                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      >
                        <div className='text-sm font-medium leading-none'>
                          {subItem.title}
                        </div>
                        {subItem.description && (
                          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            {subItem.description}
                          </p>
                        )}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink href={item.href}>
                {item.title}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

import {
  LegacyCard,
  Page,
  Layout,
  Image,
  LegacyStack,
  Link,
  VerticalStack,
  Text,
} from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'

import { trophyImage } from '../assets'

import { ProductsCard } from '../components'

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <LegacyStack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <LegacyStack.Item fill>
                <VerticalStack gap="5">
                  <Text variant="headingMd" as="h2">
                    Nice work on building a Shopify app 🎉
                  </Text>
                  <p>
                    Your app is ready to explore! It contains everything you
                    need to get started including the{' '}
                    <Link url="https://polaris.shopify.com/" target="_blank">
                      Polaris design system
                    </Link>
                    ,{' '}
                    <Link
                      url="https://shopify.dev/api/admin-graphql"
                      target="_blank"
                    >
                      Shopify Admin API
                    </Link>
                    , and{' '}
                    <Link
                      url="https://shopify.dev/apps/tools/app-bridge"
                      target="_blank"
                    >
                      App Bridge
                    </Link>{' '}
                    UI library and components.
                  </p>
                  <p>
                    Ready to go? Start populating your app with some sample
                    products to view and test in your store.{' '}
                  </p>
                  <p>
                    Learn more about building out your app in{' '}
                    <Link
                      url="https://shopify.dev/apps/getting-started/add-functionality"
                      target="_blank"
                    >
                      this Shopify tutorial
                    </Link>{' '}
                    📚{' '}
                  </p>
                </VerticalStack>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <div style={{ padding: '0 20px' }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </LegacyStack.Item>
            </LegacyStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  )
}

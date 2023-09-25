import { LegacyCard, Page, Layout, VerticalStack, Text } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'

export default function PageName() {
  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: 'Primary action',
          onAction: () => console.log('Primary action'),
        }}
        secondaryActions={[
          {
            content: 'Secondary action',
            onAction: () => console.log('Secondary action'),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <VerticalStack gap="4">
              <p>Body</p>
            </VerticalStack>
          </LegacyCard>
          <LegacyCard sectioned>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <VerticalStack>
              <p>Body</p>
            </VerticalStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard sectioned>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <VerticalStack>
              <p>Body</p>
            </VerticalStack>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

import { useState } from 'react'
import {
  LegacyCard,
  Heading,
  DisplayText,
  TextStyle,
  VerticalStack,
  Text,
} from '@shopify/polaris'
import { Toast } from '@shopify/app-bridge-react'
import { useAppQuery, useAuthenticatedFetch } from '../hooks'

type EmptyToastProps = {
  content: string
  error?: boolean
}

export function ProductsCard() {
  const emptyToastProps: EmptyToastProps = { content: null }
  const [isLoading, setIsLoading] = useState(true)
  const [toastProps, setToastProps] = useState<EmptyToastProps>(emptyToastProps)
  const fetch = useAuthenticatedFetch()

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/products/count',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false)
      },
    },
  })

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  )

  const handlePopulate = async () => {
    setIsLoading(true)
    const response = await fetch('/api/products/create')

    if (response.ok) {
      await refetchProductCount()
      setToastProps({ content: '5 products created!' })
    } else {
      setIsLoading(false)
      setToastProps({
        content: 'There was an error creating products',
        error: true,
      })
    }
  }

  return (
    <>
      {toastMarkup}
      <LegacyCard
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: 'Populate 5 products',
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <VerticalStack gap="5">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
          <Text as="h4" variant="headingMd">
            TOTAL PRODUCTS
          </Text>
          <Text as="span" variant="headingXl" fontWeight="semibold">
            {isLoadingCount ? '-' : data.count}
          </Text>
        </VerticalStack>
      </LegacyCard>
    </>
  )
}

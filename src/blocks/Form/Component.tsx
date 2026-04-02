'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { BlockWrapper } from '@/components/BlockWrapper'

import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'
import { CMSLink } from '@/components/Link'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro?: boolean
  form: FormType
  introContent?: SerializedEditorState
  layout?: 'default' | 'splitSidebar'
  sidebarTitle?: string
  sidebarDescription?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebarContacts?: any[]
}

export const FormBlock: React.FC<
  {
    id?: string
    className?: string
    backgroundVariant?: 'color' | 'image'
    colorTheme?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    backgroundImage?: any
    imageTextColor?: 'white' | 'black' | null
    blockId?: string | null
  } & FormBlockType
> = (props) => {
  const {
    id,
    className,
    backgroundVariant,
    colorTheme,
    backgroundImage,
    imageTextColor,
    blockId,
    enableIntro,
    layout = 'default',
    sidebarTitle,
    sidebarDescription,
    sidebarContacts,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps?.fields || [],
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const renderFields = () => {
    return (
      <div className="flex flex-wrap -mx-3 gap-y-6">
        {formFromProps &&
          formFromProps.fields &&
          formFromProps.fields?.map((field, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields] as unknown as React.FC<any>
            if (Field) {
              return (
                <Field
                  key={index}
                  form={formFromProps}
                  {...field}
                  {...formMethods}
                  control={control}
                  errors={errors}
                  register={register}
                />
              )
            }
            return null
          })}
      </div>
    )
  }

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId ?? id}
      className={className}
    >
      <div className="container max-w-screen-2xl">
        {layout === 'splitSidebar' ? (
          <div className="bg-background rounded-3xl shadow-2xl border border-[var(--theme-outline-variant)] overflow-hidden flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/3 bg-primary p-8 py-12 md:px-12 lg:px-8 text-background relative overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-primary/10" />
              <div className="relative z-10">
                {sidebarTitle && (
                  <h2
                    className="text-3xl font-bold mb-6"
                    style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
                  >
                    {sidebarTitle}
                  </h2>
                )}
                {sidebarDescription && (
                  <div
                    className="mb-12 text-[var(--theme-on-primary-container)] leading-relaxed text-base xl:text-lg"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {sidebarDescription}
                  </div>
                )}
                <div className="space-y-6">
                  {sidebarContacts &&
                    sidebarContacts.map((contact, idx) => {
                      const IconComponent = contact.icon
                        ? lucideIcons[contact.icon as LucideIconName]
                        : null
                      return (
                        <div key={idx} className="flex items-center gap-4 text-lg">
                          {IconComponent && (
                            <div className="bg-amber-600 p-2 rounded-full">
                              <IconComponent className="text-white w-6 h-6 shrink-0" />
                            </div>
                          )}
                          <div className="flex-1 font-bold text-sm lg:text-base">
                            <CMSLink
                              {...contact.link}
                              className="hover:text-amber-500 transition-colors"
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3 p-8 md:p-12">
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <RichText data={confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && (
                  <div className="text-red-500 mb-6 font-bold">{`${error.status || '500'}: ${error.message || ''}`}</div>
                )}

                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                    {renderFields()}

                    <div className="mt-8 px-3">
                      <Button
                        form={formID}
                        type="submit"
                        variant="default"
                        className="w-full md:w-auto text-lg py-6 px-10 hover:shadow-xl hover:shadow-[var(--theme-primary)]/20 transition-all active:scale-95 shadow-none rounded-xl bg-[var(--theme-primary)] text-[var(--theme-on-primary)] hover:bg-[var(--theme-primary)]"
                      >
                        {submitButtonLabel}
                      </Button>
                    </div>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>
        ) : (
          <div className="max-w-[48rem] mx-auto">
            {enableIntro && introContent && !hasSubmitted && (
              <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
            )}
            <div className="p-6 md:p-10 border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-container-low)] rounded-3xl shadow-sm">
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <RichText data={confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && (
                  <div className="text-red-500 mb-6 font-bold">{`${error.status || '500'}: ${error.message || ''}`}</div>
                )}

                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                    {renderFields()}

                    <div className="mt-8 px-3">
                      <Button
                        form={formID}
                        type="submit"
                        variant="default"
                        className="w-full py-6 text-lg rounded-xl"
                      >
                        {submitButtonLabel}
                      </Button>
                    </div>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}

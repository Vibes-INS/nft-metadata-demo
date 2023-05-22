export interface GalxeOATMetadata {
  name: string
  description: string
  image: string
  animation_url: string
  background_color: string
  external_link: string
  owner: string
  attributes: Attribute[]
}

export interface Attribute {
  trait_type: string
  value: any
  display_type?: string
}

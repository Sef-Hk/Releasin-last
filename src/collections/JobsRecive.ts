import type { CollectionConfig } from 'payload'

export const JoinRequests: CollectionConfig = {
  slug: 'join-requests',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,   // adjust based on your needs
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media', // assuming you have a media collection for uploads
      required: true,
    },
    {
      name: 'additionalLinks',
      type: 'text',
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
  ],
}

"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  PlusCircle,
  Trash2,
  Pencil,
  Eye,
  FileText,
  Filter,
  Download,
  ArrowUpDown,
  MoreHorizontal,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Document {
  id: string
  title: string
  category: string
  court: string
  date: string
  documentType: string
  pdfUrl?: string
  status: "published" | "draft" | "archived"
  description?: string
}

// Simple document form component since the original was commented out
function AdminDocumentForm({ 
  document, 
  onSubmit, 
  onCancel 
}: { 
  document?: Document | null
  onSubmit: (doc: Document | Omit<Document, 'id'>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: document?.title || '',
    category: document?.category || '',
    court: document?.court || '',
    date: document?.date || new Date().toISOString().split('T')[0],
    documentType: document?.documentType || 'Case Law',
    pdfUrl: document?.pdfUrl || '',
    status: document?.status || 'draft' as const,
    description: document?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (document) {
      onSubmit({ ...document, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ITAT">ITAT</SelectItem>
              <SelectItem value="GST">GST</SelectItem>
              <SelectItem value="Income Tax">Income Tax</SelectItem>
              <SelectItem value="High Court">High Court</SelectItem>
              <SelectItem value="Supreme Court">Supreme Court</SelectItem>
              <SelectItem value="Tribunal Court">Tribunal Court</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="court">Court</Label>
          <Input
            id="court"
            value={formData.court}
            onChange={(e) => setFormData(prev => ({ ...prev, court: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="documentType">Document Type</Label>
          <Select
            value={formData.documentType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Case Law">Case Law</SelectItem>
              <SelectItem value="Order">Order</SelectItem>
              <SelectItem value="Judgment">Judgment</SelectItem>
              <SelectItem value="Circular">Circular</SelectItem>
              <SelectItem value="Notification">Notification</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Document['status'] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pdfUrl">PDF URL</Label>
        <Input
          id="pdfUrl"
          type="url"
          value={formData.pdfUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, pdfUrl: e.target.value }))}
          placeholder="https://example.com/document.pdf"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the document..."
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {document ? 'Update Document' : 'Add Document'}
        </Button>
      </div>
    </form>
  )
}

export function AdminDocuments() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortField, setSortField] = useState<keyof Document>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null)
  
  useEffect(() => {
    fetchDocuments()
  }, [])
  
  const fetchDocuments = async () => {
    try {
      setIsLoading(true)
      
      // In a real app, fetch from API
      // For demo, we'll use localStorage
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const storedDocs = localStorage.getItem('elibrary_entries')
      if (storedDocs) {
        const entries = JSON.parse(storedDocs)
        
        // Convert to our document format
        const formattedDocs: Document[] = entries.map((entry: any) => ({
          id: entry.id,
          title: `${entry.appellant} vs ${entry.respondent}`,
          category: entry.category_id,
          court: entry.bench,
          date: entry.tribunal_order_date || entry.createdAt,
          documentType: entry.documentType || 'Case Law',
          pdfUrl: entry.pdfUrl || entry.download,
          status: 'published' as const,
          description: entry.description || ''
        }))
        
        setDocuments(formattedDocs)
      } else {
        // Initialize with empty array
        setDocuments([])
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleAddDocument = (document: Omit<Document, 'id'>) => {
    // Generate a new ID
    const newDoc: Document = {
      ...document,
      id: Date.now().toString(),
    }
    
    setDocuments(prev => [newDoc, ...prev])
    setShowAddForm(false)
    
    toast({
      title: 'Success',
      description: 'Document added successfully',
    })
  }
  
  const handleEditDocument = (document: Document | Omit<Document, "id">) => {
    if ('id' in document) {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === document.id ? document as Document : doc
        )
      )
    
      setEditingDocument(null)
      
      toast({
        title: 'Success',
        description: 'Document updated successfully',
      })
    }
  }
  
  const handleDeleteDocument = async () => {
    if (!documentToDelete) return
    
    try {
      setDocuments(prev => 
        prev.filter(doc => doc.id !== documentToDelete)
      )
      
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      })
    } finally {
      setDeleteConfirmOpen(false)
      setDocumentToDelete(null)
    }
  }
  
  const confirmDelete = (id: string) => {
    setDocumentToDelete(id)
    setDeleteConfirmOpen(true)
  }
  
  const handleSort = (field: keyof Document) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.court.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || doc.category === selectedCategory
      const matchesStatus = selectedStatus === '' || doc.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      const aVal = a[sortField] ?? ''
      const bVal = b[sortField] ?? ''
      
      if (aVal < bVal) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (aVal > bVal) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  
  const categories = Array.from(new Set(documents.map(doc => doc.category)))
  const statuses: Document['status'][] = ['published', 'draft', 'archived']
  
  return (
    <div className="space-y-6">
      {(showAddForm || editingDocument) ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {editingDocument ? 'Edit Document' : 'Add New Document'}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingDocument(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AdminDocumentForm
              document={editingDocument}
              onSubmit={editingDocument ? handleEditDocument : handleAddDocument}
              onCancel={() => {
                setShowAddForm(false)
                setEditingDocument(null)
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <Label className="text-xs">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <Label className="text-xs">Status</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={() => setShowAddForm(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground">Loading documents...</p>
              </div>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg border dark:bg-gray-800">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No documents found</p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                {searchQuery || selectedCategory || selectedStatus ? 
                  "No documents match your current filters. Try adjusting your search criteria." : 
                  "Your library is empty. Add your first document to get started."}
              </p>
              {(searchQuery || selectedCategory || selectedStatus) && (
                <Button variant="outline" onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                  setSelectedStatus('')
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('title')}
                        className="gap-1 font-medium"
                      >
                        Title
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('category')}
                        className="gap-1 font-medium"
                      >
                        Category
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('court')}
                        className="gap-1 font-medium"
                      >
                        Court
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('date')}
                        className="gap-1 font-medium"
                      >
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.court}</TableCell>
                      <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={doc.status === 'published' ? 'default' : 
                                  doc.status === 'draft' ? 'outline' : 'secondary'}
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => doc.pdfUrl && window.open(doc.pdfUrl, '_blank')}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingDocument(doc)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => doc.pdfUrl && window.open(doc.pdfUrl, '_blank')}
                              disabled={!doc.pdfUrl}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => confirmDelete(doc.id)} 
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document from your library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDocument}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

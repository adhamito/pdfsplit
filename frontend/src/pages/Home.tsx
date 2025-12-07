import { useState, useRef } from 'react'
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Alert,
  AlertDescription,
  AlertTitle
} from '@dawa/design-system'
import { FileUp, X, FileText, CheckCircle2, AlertCircle, Scissors, Minimize, Image as ImageIcon, FileSpreadsheet } from 'lucide-react'

function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; download_url?: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Split State
  const [splitFile, setSplitFile] = useState<File | null>(null)
  const [splitting, setSplitting] = useState(false)
  const [splitResult, setSplitResult] = useState<{ success: boolean; message: string; download_urls?: string[] } | null>(null)
  const [splitError, setSplitError] = useState<string | null>(null)
  const splitInputRef = useRef<HTMLInputElement>(null)

  // Compress State
  const [compressFile, setCompressFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [compressResult, setCompressResult] = useState<{ success: boolean; message: string; download_url?: string } | null>(null)
  const [compressError, setCompressError] = useState<string | null>(null)
  const compressInputRef = useRef<HTMLInputElement>(null)

  // Convert PDF to Image State
  const [convertFile, setConvertFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [convertResult, setConvertResult] = useState<{ success: boolean; message: string; download_url?: string } | null>(null)
  const [convertError, setConvertError] = useState<string | null>(null)
  const convertInputRef = useRef<HTMLInputElement>(null)

  // Convert PDF to Excel State
  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [excelConverting, setExcelConverting] = useState(false)
  const [excelResult, setExcelResult] = useState<{ success: boolean; message: string; download_url?: string } | null>(null)
  const [excelError, setExcelError] = useState<string | null>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf')
      setFiles(prev => [...prev, ...newFiles])
      setError(null)
    }
  }

  const handleSplitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setSplitFile(file)
        setSplitError(null)
      }
    }
  }

  const handleCompressFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setCompressFile(file)
        setCompressError(null)
      }
    }
  }

  const handleConvertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setConvertFile(file)
        setConvertError(null)
      }
    }
  }

  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setExcelFile(file)
        setExcelError(null)
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.')
      return
    }

    setMerging(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/merge`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        setFiles([])
      } else {
        setError(data.error || 'Failed to merge PDFs')
      }
    } catch (err) {
      setError('An error occurred while communicating with the server.')
    } finally {
      setMerging(false)
    }
  }

  const handleSplit = async () => {
    if (!splitFile) {
      setSplitError('Please select a PDF file to split.')
      return
    }

    setSplitting(true)
    setSplitError(null)
    setSplitResult(null)

    const formData = new FormData()
    formData.append('file', splitFile)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/split`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setSplitResult(data)
        setSplitFile(null)
      } else {
        setSplitError(data.error || 'Failed to split PDF')
      }
    } catch (err) {
      setSplitError('An error occurred while communicating with the server.')
    } finally {
      setSplitting(false)
    }
  }

  const handleCompress = async () => {
    if (!compressFile) {
      setCompressError('Please select a PDF file to compress.')
      return
    }

    setCompressing(true)
    setCompressError(null)
    setCompressResult(null)

    const formData = new FormData()
    formData.append('file', compressFile)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/compress`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setCompressResult(data)
        setCompressFile(null)
      } else {
        setCompressError(data.error || 'Failed to compress PDF')
      }
    } catch (err) {
      setCompressError('An error occurred while communicating with the server.')
    } finally {
      setCompressing(false)
    }
  }

  const handleConvert = async () => {
    if (!convertFile) {
      setConvertError('Please select a PDF file to convert.')
      return
    }

    setConverting(true)
    setConvertError(null)
    setConvertResult(null)

    const formData = new FormData()
    formData.append('file', convertFile)
    formData.append('format', 'png')
    formData.append('dpi', '300')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/convert-to-images`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setConvertResult(data)
        setConvertFile(null)
      } else {
        setConvertError(data.error || 'Failed to convert PDF')
      }
    } catch (err) {
      setConvertError('An error occurred while communicating with the server.')
    } finally {
      setConverting(false)
    }
  }

  const handleExcelConvert = async () => {
    if (!excelFile) {
      setExcelError('Please select a PDF file to convert.')
      return
    }

    setExcelConverting(true)
    setExcelError(null)
    setExcelResult(null)

    const formData = new FormData()
    formData.append('file', excelFile)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/convert-to-excel`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setExcelResult(data)
        setExcelFile(null)
      } else {
        setExcelError(data.error || 'Failed to convert PDF')
      }
    } catch (err) {
      setExcelError('An error occurred while communicating with the server.')
    } finally {
      setExcelConverting(false)
    }
  }

  return (
    <div className="container-page max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">PDF Tools</h1>
          <p className="text-muted-foreground text-lg">Merge, split, compress, and convert your PDF documents securely.</p>
        </div>
      </div>

      <Tabs defaultValue="merge" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="merge">Merge PDFs</TabsTrigger>
          <TabsTrigger value="split">Split PDF</TabsTrigger>
          <TabsTrigger value="compress" className="flex items-center gap-2">
            <Minimize className="h-4 w-4" />
            Compress
          </TabsTrigger>
          <TabsTrigger value="convert" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            PDF to Images
          </TabsTrigger>
          <TabsTrigger value="excel" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            PDF to Excel
          </TabsTrigger>
        </TabsList>
        
        {/* Merge Tab Content */}
        <TabsContent value="merge">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Merge PDFs</CardTitle>
              <CardDescription>Combine multiple PDF files into a single document.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div 
                className="border-2 border-dashed border-input hover:border-primary rounded-lg p-10 text-center transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF files only (max 50MB each)</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf" 
                  multiple 
                  onChange={handleFileChange} 
                />
              </div>

              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                    <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-destructive hover:text-destructive">
                      Clear all
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-card border group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              removeFile(index)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <Alert className="border-green-500/50 text-green-600 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription className="flex items-center justify-between mt-2">
                    <span>{result.message}</span>
                    {result.download_url && (
                      <Button asChild size="sm" variant="outline" className="ml-4 border-green-200 hover:bg-green-100 hover:text-green-700">
                        <a href={result.download_url} download target="_blank" rel="noreferrer">
                          Download Merged PDF
                        </a>
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end pt-4">
                <Button 
                  size="lg" 
                  onClick={handleMerge} 
                  disabled={files.length < 2 || merging}
                  className="w-full sm:w-auto"
                >
                  {merging ? 'Merging PDFs...' : 'Merge PDFs'}
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Split Tab Content */}
        <TabsContent value="split">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Split PDF</CardTitle>
              <CardDescription>Split a PDF file into individual pages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div 
                className="border-2 border-dashed border-input hover:border-primary rounded-lg p-10 text-center transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50"
                onClick={() => splitInputRef.current?.click()}
              >
                <Scissors className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">Select a single PDF file</p>
                </div>
                <input 
                  type="file" 
                  ref={splitInputRef} 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleSplitFileChange} 
                />
              </div>

              {splitFile && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-card border">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="h-6 w-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{splitFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(splitFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSplitFile(null)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {splitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{splitError}</AlertDescription>
                </Alert>
              )}

              {splitResult && (
                <Alert className="border-green-500/50 text-green-600 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription className="mt-2">
                    <p className="mb-4">{splitResult.message}</p>
                    <p className="text-sm">Files have been split successfully. Check your download folder or server response.</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end pt-4">
                <Button 
                  size="lg" 
                  onClick={handleSplit} 
                  disabled={!splitFile || splitting}
                  className="w-full sm:w-auto"
                >
                  {splitting ? 'Splitting PDF...' : 'Split PDF'}
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Compress Tab Content */}
        <TabsContent value="compress">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Compress PDF</CardTitle>
              <CardDescription>Reduce the file size of your PDF documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div 
                className="border-2 border-dashed border-input hover:border-primary rounded-lg p-10 text-center transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50"
                onClick={() => compressInputRef.current?.click()}
              >
                <Minimize className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">Select a single PDF file</p>
                </div>
                <input 
                  type="file" 
                  ref={compressInputRef} 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleCompressFileChange} 
                />
              </div>

              {compressFile && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-card border">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="h-6 w-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{compressFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(compressFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setCompressFile(null)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {compressError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{compressError}</AlertDescription>
                </Alert>
              )}

              {compressResult && (
                <Alert className="border-green-500/50 text-green-600 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription className="flex items-center justify-between mt-2">
                    <span>{compressResult.message}</span>
                    {compressResult.download_url && (
                      <Button asChild size="sm" variant="outline" className="ml-4 border-green-200 hover:bg-green-100 hover:text-green-700">
                        <a href={compressResult.download_url} download target="_blank" rel="noreferrer">
                          Download Compressed PDF
                        </a>
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end pt-4">
                <Button 
                  size="lg" 
                  onClick={handleCompress} 
                  disabled={!compressFile || compressing}
                  className="w-full sm:w-auto"
                >
                  {compressing ? 'Compressing PDF...' : 'Compress PDF'}
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Convert Tab Content */}
        <TabsContent value="convert">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Convert PDF to Images</CardTitle>
              <CardDescription>Convert PDF pages to high-quality images (PNG).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-input hover:border-primary rounded-lg p-10 text-center transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50"
                onClick={() => convertInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={convertInputRef}
                  onChange={handleConvertFileChange}
                  className="hidden"
                  accept=".pdf"
                />
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  {convertFile ? convertFile.name : "Click to upload a PDF file"}
                </p>
              </div>

              {convertError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{convertError}</AlertDescription>
                </Alert>
              )}

              {convertResult && (
                <Alert className="border-green-500/50 text-green-600 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription className="flex items-center justify-between mt-2">
                    <span>{convertResult.message}</span>
                    {convertResult.download_url && (
                      <Button asChild size="sm" variant="outline" className="ml-4 border-green-200 hover:bg-green-100 hover:text-green-700">
                        <a href={convertResult.download_url} download target="_blank" rel="noreferrer">
                          Download Images (ZIP)
                        </a>
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                className="w-full" 
                onClick={handleConvert} 
                disabled={!convertFile || converting}
              >
                {converting ? 'Converting...' : 'Convert to Images'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="excel">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Convert PDF to Excel</CardTitle>
              <CardDescription>Extract tables from PDF to an Excel spreadsheet.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-input hover:border-primary rounded-lg p-10 text-center transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50"
                onClick={() => excelInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={excelInputRef}
                  onChange={handleExcelFileChange}
                  className="hidden"
                  accept=".pdf"
                />
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  {excelFile ? excelFile.name : "Click to upload a PDF file"}
                </p>
              </div>

              {excelError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{excelError}</AlertDescription>
                </Alert>
              )}

              {excelResult && (
                <Alert className="border-green-500/50 text-green-600 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription className="flex items-center justify-between mt-2">
                    <span>{excelResult.message}</span>
                    {excelResult.download_url && (
                      <Button asChild size="sm" variant="outline" className="ml-4 border-green-200 hover:bg-green-100 hover:text-green-700">
                        <a href={excelResult.download_url} download target="_blank" rel="noreferrer">
                          Download Excel
                        </a>
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                className="w-full" 
                onClick={handleExcelConvert} 
                disabled={!excelFile || excelConverting}
              >
                {excelConverting ? 'Converting...' : 'Convert to Excel'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default Home
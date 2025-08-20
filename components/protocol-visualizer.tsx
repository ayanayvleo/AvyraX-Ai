"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProtocolVisualizer() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Protocol Architecture</CardTitle>
          <CardDescription>Visual representation of the AI-to-AI communication flow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Protocol Flow Visualization */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
              {/* Source AI */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI₁
                </div>
                <Badge variant="outline">Source AI</Badge>
                <p className="text-xs text-muted-foreground">GPT-4</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <p className="text-xs mt-1">Tokenize</p>
              </div>

              {/* Tokenizer */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                  T
                </div>
                <Badge variant="outline">Tokenizer</Badge>
                <p className="text-xs text-muted-foreground">AI Concepts</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500"></div>
                <p className="text-xs mt-1">Preserve</p>
              </div>

              {/* Semantic Engine */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <Badge variant="outline">Semantic</Badge>
                <p className="text-xs text-muted-foreground">Preservation</p>
              </div>

              {/* Arrow 3 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <p className="text-xs mt-1">Compress</p>
              </div>

              {/* Compression Engine */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                  C
                </div>
                <Badge variant="outline">Compression</Badge>
                <p className="text-xs text-muted-foreground">Intelligent</p>
              </div>

              {/* Arrow 4 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></div>
                <p className="text-xs mt-1">Translate</p>
              </div>

              {/* Target AI */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI₂
                </div>
                <Badge variant="outline">Target AI</Badge>
                <p className="text-xs text-muted-foreground">Claude-3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Types</CardTitle>
            <CardDescription>Classification of AI communication elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <div>
                  <p className="font-medium">Concept Tokens</p>
                  <p className="text-sm text-muted-foreground">Core AI/ML concepts and terminology</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div>
                  <p className="font-medium">Instruction Tokens</p>
                  <p className="text-sm text-muted-foreground">Action-oriented commands and directives</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <div>
                  <p className="font-medium">Parameter Tokens</p>
                  <p className="text-sm text-muted-foreground">Numerical values and configurations</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <div>
                  <p className="font-medium">Modifier Tokens</p>
                  <p className="text-sm text-muted-foreground">Contextual qualifiers and constraints</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported AI Systems</CardTitle>
            <CardDescription>Compatible AI architectures and their dialects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">GPT Family</p>
                <p className="text-sm text-muted-foreground">GPT-3.5, GPT-4, GPT-4 Turbo</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Claude Family</p>
                <p className="text-sm text-muted-foreground">Claude-2, Claude-3, Claude-3.5</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Gemini Family</p>
                <p className="text-sm text-muted-foreground">Gemini Pro, Gemini Ultra</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Open Source</p>
                <p className="text-sm text-muted-foreground">LLaMA-2, Mistral, PaLM-2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

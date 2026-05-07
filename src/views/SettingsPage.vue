<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-20">
    <!-- Top Navbar -->
    <TopNavbar />
    <!-- Bottom Navbar -->
    <BottomNavbar />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <Settings class="w-8 h-8 text-orange-600" />
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            Reading Settings
          </h1>
        </div>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          Customize your ebook reading experience
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Settings Panel -->
        <div class="lg:col-span-1">
          <Tabs defaultValue="theme" class="w-full">
            <TabsList class="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="theme" class="text-xs sm:text-sm">
                Theme
              </TabsTrigger>
              <TabsTrigger value="typography" class="text-xs sm:text-sm">
                Type
              </TabsTrigger>
              <TabsTrigger value="layout" class="text-xs sm:text-sm">
                Layout
              </TabsTrigger>
            </TabsList>

            <!-- Theme Tab -->
            <TabsContent value="theme" class="space-y-4">
              <Card class="border-none shadow-lg">
                <CardHeader>
                  <CardTitle class="text-lg">Color Theme</CardTitle>
                  <CardDescription>Choose your preferred reading theme</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="grid grid-cols-1 gap-3">
                    <button
                      @click="applyTheme('light')"
                      :class="[`p-4 rounded-lg border-2 transition-all`, settings.theme === 'light' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-gray-300']"
                    >
                      <div class="flex items-center gap-3">
                        <Sun class="w-5 h-5 text-orange-500" />
                        <div class="text-left">
                          <p class="font-semibold text-gray-900">Light</p>
                          <p class="text-xs text-gray-600">Bright and clean</p>
                        </div>
                      </div>
                    </button>

                    <button
                      @click="applyTheme('dark')"
                      :class="[`p-4 rounded-lg border-2 transition-all`, settings.theme === 'dark' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300']"
                    >
                      <div class="flex items-center gap-3">
                        <Moon class="w-5 h-5 text-blue-500" />
                        <div class="text-left">
                          <p class="font-semibold text-gray-900">Dark</p>
                          <p class="text-xs text-gray-600">Comfortable at night</p>
                        </div>
                      </div>
                    </button>

                    <button
                      @click="applyTheme('sepia')"
                      :class="[`p-4 rounded-lg border-2 transition-all`, settings.theme === 'sepia' ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-gray-300']"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-5 h-5 rounded"
                          style="backgroundColor: '#d4a574'"
                        />
                        <div class="text-left">
                          <p class="font-semibold text-gray-900">Sepia</p>
                          <p class="text-xs text-gray-600">Paper-like feel</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <!-- Custom Colors -->
                  <div class="pt-4 border-t space-y-4">
                    <Label class="text-sm font-semibold">Text Color</Label>
                    <div class="flex gap-2">
                      <input
                        type="color"
                        v-model="settings.textColor"
                        class="w-12 h-10 rounded cursor-pointer border"
                      />
                      <input
                        type="text"
                        v-model="settings.textColor"
                        class="flex-1 px-2 py-2 rounded border text-sm"
                      />
                    </div>

                    <Label class="text-sm font-semibold">Background Color</Label>
                    <div class="flex gap-2">
                      <input
                        type="color"
                        v-model="settings.backgroundColor"
                        class="w-12 h-10 rounded cursor-pointer border"
                      />
                      <input
                        type="text"
                        v-model="settings.backgroundColor"
                        class="flex-1 px-2 py-2 rounded border text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <!-- Typography Tab -->
            <TabsContent value="typography" class="space-y-4">
              <Card class="border-none shadow-lg">
                <CardHeader>
                  <CardTitle class="text-lg">Typography</CardTitle>
                  <CardDescription>Adjust text appearance</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                  <!-- Font Size -->
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <Label class="font-semibold">Font Size</Label>
                      <span class="text-2xl font-semibold text-orange-600">
                        {{ settings.fontSize }}px
                      </span>
                    </div>
                    <Slider
                      v-model="settings.fontSize"
                      min="14"
                      max="28"
                      step="1"
                      class="w-full"
                    />
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>

                  <!-- Font Family -->
                  <div class="space-y-3">
                    <Label class="font-semibold">Font Family</Label>
                    <RadioGroup v-model="settings.fontFamily">
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="serif" id="serif" />
                        <Label for="serif" class="font-normal cursor-pointer flex-1">
                          <span style="fontFamily: 'Georgia, serif'">
                            Serif (Georgia) - Traditional
                          </span>
                        </Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="sans-serif" id="sans-serif" />
                        <Label for="sans-serif" class="font-normal cursor-pointer flex-1">
                          <span style="fontFamily: 'Arial, sans-serif'">
                            Sans-serif (Arial) - Modern
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <!-- Line Height -->
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <Label class="font-semibold">Line Height</Label>
                      <span class="text-lg font-semibold text-orange-600">
                        {{ settings.lineHeight.toFixed(1) }}
                      </span>
                    </div>
                    <Slider
                      v-model="settings.lineHeight"
                      min="1.4"
                      max="2.4"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Tight</span>
                      <span>Spacious</span>
                    </div>
                  </div>

                  <!-- Letter Spacing -->
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <Label class="font-semibold">Letter Spacing</Label>
                      <span class="text-lg font-semibold text-orange-600">
                        {{ settings.letterSpacing }}px
                      </span>
                    </div>
                    <Slider
                      v-model="settings.letterSpacing"
                      min="0"
                      max="3"
                      step="0.5"
                      class="w-full"
                    />
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Normal</span>
                      <span>Wide</span>
                    </div>
                  </div>

                  <!-- Text Justification -->
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Label for="justify" class="font-semibold cursor-pointer">
                      Justify Text
                    </Label>
                    <Switch
                      id="justify"
                      v-model="settings.justify"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <!-- Layout Tab -->
            <TabsContent value="layout" class="space-y-4">
              <Card class="border-none shadow-lg">
                <CardHeader>
                  <CardTitle class="text-lg">Page Layout</CardTitle>
                  <CardDescription>Customize reading width</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                  <!-- Page Width -->
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <Label class="font-semibold">Page Width</Label>
                      <span class="text-lg font-semibold text-orange-600">
                        {{ settings.pageWidth }}px
                      </span>
                    </div>
                    <Slider
                      v-model="settings.pageWidth"
                      min="600"
                      max="1200"
                      step="50"
                      class="w-full"
                    />
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Narrow</span>
                      <span>Wide</span>
                    </div>
                  </div>

                  <!-- Quick Presets -->
                  <div class="pt-4 border-t space-y-3">
                    <Label class="font-semibold block">Quick Presets</Label>
                    <div class="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        @click="setCompactPreset"
                        class="text-xs"
                      >
                        Compact
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        @click="setDefaultPreset"
                        class="text-xs"
                      >
                        Default
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        @click="setComfortablePreset"
                        class="text-xs"
                      >
                        Comfortable
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        @click="setSpaciousPreset"
                        class="text-xs"
                      >
                        Spacious
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <!-- Reset Button -->
          <Button
            variant="outline"
            class="w-full mt-6 gap-2 border-red-200 text-red-600 hover:bg-red-50"
            @click="resetSettings"
          >
            <RotateCcw class="w-4 h-4" />
            Reset to Defaults
          </Button>
        </div>

        <!-- Preview Panel -->
        <div class="lg:col-span-2">
          <Card class="border-none shadow-lg sticky top-6 h-fit">
            <CardHeader>
              <div class="flex items-center gap-2">
                <Eye class="w-5 h-5 text-orange-600" />
                <div>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>See your changes in real-time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                class="rounded-lg overflow-hidden transition-all duration-300 border-4 border-gray-200"
                :style="{ backgroundColor: settings.backgroundColor, color: settings.textColor }"
              >
                <!-- Reader Preview -->
                <div
                  class="p-8 space-y-6"
                  :style="{
                    maxWidth: `${settings.pageWidth}px`,
                    margin: '0 auto',
                    fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif',
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                    textAlign: settings.justify ? 'justify' : 'left'
                  }"
                >
                  <div>
                    <h2
                      class="text-2xl font-bold mb-4"
                      :style="{ color: settings.textColor }"
                    >
                      Chapter 1: The Beginning
                    </h2>

                    <p class="mb-4 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh
                      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </p>

                    <p class="mb-4 leading-relaxed">
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                      consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                      qui blandit praesent luptatum zzril delenit augue duis diam vulputate.
                    </p>

                    <p>
                      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                      lobortis nisl ut aliquip ex ea commodo consequat duis autem vel eum iriure dolor in hendrerit
                      in vulputate velit esse molestie consequat.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Settings Summary -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2 text-sm">
                <p class="font-semibold text-gray-900 dark:text-white">Current Settings:</p>
                <div class="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
                  <span>Theme: <span class="font-semibold capitalize">{{ settings.theme }}</span></span>
                  <span>Font: <span class="font-semibold">{{ settings.fontFamily === 'serif' ? 'Serif' : 'Sans-serif' }}</span></span>
                  <span>Size: <span class="font-semibold">{{ settings.fontSize }}px</span></span>
                  <span>Line Height: <span class="font-semibold">{{ settings.lineHeight.toFixed(1) }}</span></span>
                  <span>Page Width: <span class="font-semibold">{{ settings.pageWidth }}px</span></span>
                  <span>Justify: <span class="font-semibold">{{ settings.justify ? 'Yes' : 'No' }}</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Slider from '@/components/ui/Slider.vue'
import Button from '@/components/ui/Button.vue'
import Label  from '@/components/ui/Label.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import RadioGroupItem  from '@/components/ui/RadioGroupItem.vue'
import Switch  from '@/components/ui/Switch.vue'
import TopNavbar from '@/components/TopNavbar.vue'
import BottomNavbar from '@/components/BottomNavbar.vue'
import { Sun, Moon, Settings, Eye, RotateCcw } from 'lucide-vue-next'

interface EbookSettings {
  theme: 'light' | 'dark' | 'sepia'
  fontSize: number
  fontFamily: 'serif' | 'sans-serif'
  lineHeight: number
  letterSpacing: number
  pageWidth: number
  backgroundColor: string
  textColor: string
  justify: boolean
}

import { THEME_PRESETS, applyTheme } from '@/services/theme.service'
import type { EbookSettings } from '@/types/ebook.types.ts'

const DEFAULT_SETTINGS: EbookSettings = {
  theme: 'light',
  fontSize: 18,
  fontFamily: 'serif',
  lineHeight: 1.8,
  letterSpacing: 0,
  pageWidth: 800,
  backgroundColor: '#ffffff',
  textColor: '#000000',
  justify: false,
}

const settings = ref<EbookSettings>({ ...DEFAULT_SETTINGS })

onMounted(() => {
  const saved = localStorage.getItem('ebookSettings')
  if (saved) {
    try {
      settings.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load settings', e)
    }
  }
})

watch(settings, (newSettings) => {
  localStorage.setItem('ebookSettings', JSON.stringify(newSettings))
}, { deep: true })

const applyTheme = (theme: 'light' | 'dark' | 'sepia') => {
  const preset = THEME_PRESETS[theme]
  settings.value.theme = theme
  settings.value.backgroundColor = preset.backgroundColor
  settings.value.textColor = preset.textColor
  applyTheme(theme, settings.value)
}

const resetSettings = () => {
  settings.value = { ...DEFAULT_SETTINGS }
  localStorage.removeItem('ebookSettings')
}

const setCompactPreset = () => {
  settings.value.fontSize = 16
  settings.value.lineHeight = 1.6
}

const setDefaultPreset = () => {
  settings.value.fontSize = 18
  settings.value.lineHeight = 1.8
}

const setComfortablePreset = () => {
  settings.value.fontSize = 20
  settings.value.lineHeight = 2
}

const setSpaciousPreset = () => {
  settings.value.fontSize = 22
  settings.value.lineHeight = 2.2
}
</script>